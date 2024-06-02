import Link from "next/link";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";

export default function CoursesDashboardPage() {
  // Fetch data
  const courses = [
    {
      id: "001",
      name: "Quantum Physics for Kittens",
      thumbnail: "/picsum-1.png",
      description:
        "Le passage latin classique qui ne vieillit jamais, apprécie autant (ou aussi peu) le lorem ipsum que vous pouvez manipuler avec notre générateur de texte de remplissage facile à utiliser.",
      objective:
        "Si vous n'avez pas vu Game of Thrones, allez le voir tout de suite. Si vous avez alors, vous comprendrez totalement pourquoi ce générateur de lorem ipsum sur le thème de Hodor est tout simplement génial.",
      age: "4 - 20",
      lesson: "8",
      duration: "120 minutes / class",
      requirement: "Soulevez votre conception",
      photos: ["/picsum-1.png", "/picsum-1.png"],
    },
    {
      id: "002",
      name: "Introduction to Time Travel 101",
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
    },
    {
      id: "003",
      name: "Zombie Survival Strategies",
      thumbnail: "/picsum-3.png",
      description:
        "Le passage latin classique qui ne vieillit jamais, apprécie autant (ou aussi peu) le lorem ipsum que vous pouvez manipuler avec notre générateur de texte de remplissage facile à utiliser.",
      objective:
        "Si vous n'avez pas vu Game of Thrones, allez le voir tout de suite. Si vous avez alors, vous comprendrez totalement pourquoi ce générateur de lorem ipsum sur le thème de Hodor est tout simplement génial.",
      age: "4 - 20",
      lesson: "8",
      duration: "120 minutes / class",
      requirement: "Soulevez votre conception",
      photos: ["/picsum-3.png", "/picsum-3.png"],
    },
    {
      id: "004",
      name: "Extreme Juggling and Fire Breathing",
      thumbnail: "/picsum-4.png",
      description:
        "Le passage latin classique qui ne vieillit jamais, apprécie autant (ou aussi peu) le lorem ipsum que vous pouvez manipuler avec notre générateur de texte de remplissage facile à utiliser.",
      objective:
        "Si vous n'avez pas vu Game of Thrones, allez le voir tout de suite. Si vous avez alors, vous comprendrez totalement pourquoi ce générateur de lorem ipsum sur le thème de Hodor est tout simplement génial.",
      age: "4 - 20",
      lesson: "8",
      duration: "120 minutes / class",
      requirement: "Soulevez votre conception",
      photos: ["/picsum-4.png", "/picsum-4.png"],
    },
    {
      id: "005",
      name: "Advanced Banana Peeling Techniques",
      thumbnail: "/picsum-1.png",
      description:
        "Le passage latin classique qui ne vieillit jamais, apprécie autant (ou aussi peu) le lorem ipsum que vous pouvez manipuler avec notre générateur de texte de remplissage facile à utiliser.",
      objective:
        "Si vous n'avez pas vu Game of Thrones, allez le voir tout de suite. Si vous avez alors, vous comprendrez totalement pourquoi ce générateur de lorem ipsum sur le thème de Hodor est tout simplement génial.",
      age: "4 - 20",
      lesson: "8",
      duration: "120 minutes / class",
      requirement: "Soulevez votre conception",
      photos: ["/picsum-1.png", "/picsum-1.png"],
    },
    {
      id: "006",
      name: "Unicorn Riding Basics",
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
    },
  ];

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">COURSES DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl p-6">
        <div className="flex justify-end md:justify-between">
          <div className="hidden md:flex justify-between gap-x-8">
            <div className="hidden lg:block">
              <select className="p-2 mr-2 bg-gray-700 border border-gray-300 rounded-lg">
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>25</option>
              </select>
              <span>items / page</span>
            </div>
            <div>
              <input
                placeholder="Search..."
                className="p-2 bg-gray-700 border border-gray-300 focus:border-gray-50 outline-none rounded-lg"
              />
            </div>
          </div>
          <div>
            <button className="px-8 py-2 bg-primary rounded-lg flex items-center gap-2">
              <FaPlus className="font-bold" />
              <span>Add Course</span>
            </button>
          </div>
        </div>
        <div className="my-8 pb-4 overflow-x-scroll [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-gray-600">
          <table>
            <thead>
              <tr className="*:p-4 *:text-left">
                <th>Course Name</th>
                <th>Description</th>
                <th>Objectives</th>
                <th>Age</th>
                <th>Lesson</th>
                <th>Duration</th>
                <th>Requirement</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {courses.map((item) => (
                <tr
                  key={item.id}
                  className="*:p-0 [&_div]:p-4 [&_div]:text-nowrap [&_div]:text-ellipsis [&_div]:overflow-hidden"
                >
                  <td>
                    <div className="w-80">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-8 aspect-square object-cover inline mr-2"
                      />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="w-64">{item.description}</div>
                  </td>
                  <td>
                    <div className="w-64">{item.objective}</div>
                  </td>
                  <td>
                    <div className="w-32">{item.age}</div>
                  </td>
                  <td>
                    <div className="w-32">{item.lesson}</div>
                  </td>
                  <td>
                    <div className="w-48">{item.duration}</div>
                  </td>
                  <td>
                    <div className="w-48">{item.requirement}</div>
                  </td>
                  <td>
                    <div className="w-32 *:mr-4 *:cursor-pointer">
                      <Link href={`/admin/courses/${item.id}`}>
                        <RiEdit2Fill className="inline text-sky-400" />
                      </Link>
                      <RiDeleteBin2Fill className="inline text-red-400" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end *:w-8 *:aspect-square *:rounded-md *:ml-2 *:flex *:justify-center *:items-center *:cursor-pointer">
          <div>
            <FaCaretLeft />
          </div>
          <div className="bg-primary">1</div>
          <div className="bg-gray-600">2</div>
          <div className="bg-gray-600">3</div>
          <div>
            <FaCaretRight />
          </div>
        </div>
      </div>
    </div>
  );
}
