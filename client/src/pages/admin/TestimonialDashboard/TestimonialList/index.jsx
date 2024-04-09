import AdminLayout from "layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteTestimonial, getTestimonials } from "../testimonialSlice";
import { authApi, resourceApi } from "api";
import DataTable from "components/DataTable";
import { storage } from "config/firebase";
import { deleteObject, ref } from "firebase/storage";
import { useEffect, useState } from "react";

const TestimonialList = () => {
  // Verify auth
  const [actionDisable, setActionDisable] = useState(true);
  useEffect(() => {
    authApi
      .verify()
      .then((res) => {
        const { role } = res.data.decoded;
        if (role === "root" || role === "admin") {
          setActionDisable(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const dispatch = useDispatch();

  const testimonials = useSelector((state) => state.testimonial);

  useEffect(() => {
    if (testimonials.length === 0) {
      dispatch(getTestimonials({ skip: 0, limit: 5 }));
    }
  }, [testimonials, dispatch]);

  const loadHandle = () => {
    dispatch(getTestimonials({ skip: testimonials.length, limit: 5 }));
  };
  const deleteHandle = async (id) => {
    if (window.confirm("Are you sure to delete this testimonial")) {
      const { data } = await resourceApi.getSingleResource({ resource: "testimonial", id });
      // Delete item's images from firebase
      deleteObject(ref(storage, data.image));
      // Delete item
      dispatch(deleteTestimonial({ id }));
    }
  };

  return (
    <AdminLayout page="TESTIMONIAL">
      <DataTable
        fields={["image", "name", "position"]}
        data={testimonials}
        loadHandle={loadHandle}
        deleteHandle={deleteHandle}
        addDisable={actionDisable}
        editDisable={actionDisable}
        deleteDisable={actionDisable}
      />
    </AdminLayout>
  );
};

export default TestimonialList;
