import CourseDetail from "@/components/partials/courseDetail";
import CourseRegister from "@/components/partials/courseRegister";
import PageWall from "@/components/utils/pageWall";

export default function CourseDetailPage() {
  // Fetch course data from database
  const course = {
    name: "Lorem Lmao",
    thumbnail: "/picsum-2.png",
    description:
      "Le passage latin classique qui ne vieillit jamais, apprécie autant (ou aussi peu) le lorem ipsum que vous pouvez manipuler avec notre générateur de texte de remplissage facile à utiliser.",
    objective:
      "Si vous n'avez pas vu Game of Thrones, allez le voir tout de suite. Si vous avez alors, vous comprendrez totalement pourquoi ce générateur de lorem ipsum sur le thème de Hodor est tout simplement génial.",
    age: "4 - 20",
    lesson: "8",
    duration: "120 minutes / class",
    requirement: "Soulevez votre conception",
    photos: ["/picsum-2.png", "/picsum-2.png"],
  };

  return (
    <main>
      <PageWall title={course.name} image={course.thumbnail} />
      <CourseDetail course={course} className="min-h-screen flex py-24" />
      <CourseRegister />
    </main>
  );
}
