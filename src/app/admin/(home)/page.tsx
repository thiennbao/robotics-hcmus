import Statistic from "@/components/partials/statistic";
import db from "@/lib/db";
import { verifyToken } from "@/lib/token";
import { BiSolidDirections } from "react-icons/bi";
import { BsPeopleFill, BsWechat } from "react-icons/bs";
import { FaBook, FaNewspaper } from "react-icons/fa";
import { IoIosImages } from "react-icons/io";
import { PiPhoneCallFill } from "react-icons/pi";
import { RiQuillPenFill } from "react-icons/ri";

export default async function AdminPage() {
  const decode = await verifyToken();
  const isRoot = decode.payload.role === "ROOT";

  return (
    <div className="text-light">
      <h2 className="text-3xl mb-6">ADMIN DASHBOARD</h2>
      {isRoot && (
        <div className="bg-gray-700 rounded-xl p-6">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            <Statistic
              model="Competition"
              icon={<BiSolidDirections className="inline align-middle text-xl" />}
              data={await db.competition.findMany()}
            />
            <Statistic
              model="Contact"
              icon={<PiPhoneCallFill className="inline align-middle text-xl" />}
              data={await db.contact.findMany()}
            />
            <Statistic
              model="Banner"
              icon={<IoIosImages className="inline align-middle text-xl" />}
              data={await db.banner.findMany()}
            />
            <Statistic
              model="Course"
              icon={<FaBook className="inline align-middle text-xl" />}
              data={await db.course.findMany()}
            />
            <Statistic
              model="News"
              icon={<FaNewspaper className="inline align-middle text-xl" />}
              data={await db.news.findMany()}
            />
            <Statistic
              model="Message"
              icon={<BsWechat className="inline align-middle text-xl" />}
              data={await db.message.findMany()}
            />
            <Statistic
              model="Register"
              icon={<RiQuillPenFill className="inline align-middle text-xl" />}
              data={await db.register.findMany()}
            />
            <Statistic
              model="User"
              icon={<BsPeopleFill className="inline align-middle text-xl" />}
              data={await db.user.findMany()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
