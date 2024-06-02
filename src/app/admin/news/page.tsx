import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";

export default function NewsDashboardPage() {
  // Fetch data
  const news = [
    {
      id: "001",
      title:
        "Des yeux qui font baisser les miens un rire qui se perd sur sa bouche voilà le portrait sans retouche de l'homme auquel j'appartiens.",
      thumbnail: "/picsum-1.png",
      content:
        "Le passage latin classique qui ne vieillit jamais, apprécie autant (ou aussi peu) le lorem ipsum que vous pouvez manipuler avec notre générateur de texte de remplissage facile à utiliser.",
      createAt: new Date(),
    },
    {
      id: "002",
      title:
        "Des yeux qui font baisser les miens un rire qui se perd sur sa bouche voilà le portrait sans retouche de l'homme auquel j'appartiens.",
      thumbnail: "/picsum-1.png",
      content:
        "Le passage latin classique qui ne vieillit jamais, apprécie autant (ou aussi peu) le lorem ipsum que vous pouvez manipuler avec notre générateur de texte de remplissage facile à utiliser.",
      createAt: new Date(),
    },
    {
      id: "003",
      title:
        "Des yeux qui font baisser les miens un rire qui se perd sur sa bouche voilà le portrait sans retouche de l'homme auquel j'appartiens.",
      thumbnail: "/picsum-1.png",
      content:
        "Le passage latin classique qui ne vieillit jamais, apprécie autant (ou aussi peu) le lorem ipsum que vous pouvez manipuler avec notre générateur de texte de remplissage facile à utiliser.",
      createAt: new Date(),
    },
    {
      id: "004",
      title:
        "Des yeux qui font baisser les miens un rire qui se perd sur sa bouche voilà le portrait sans retouche de l'homme auquel j'appartiens.",
      thumbnail: "/picsum-1.png",
      content:
        "Le passage latin classique qui ne vieillit jamais, apprécie autant (ou aussi peu) le lorem ipsum que vous pouvez manipuler avec notre générateur de texte de remplissage facile à utiliser.",
      createAt: new Date(),
    },
    {
      id: "005",
      title:
        "Des yeux qui font baisser les miens un rire qui se perd sur sa bouche voilà le portrait sans retouche de l'homme auquel j'appartiens.",
      thumbnail: "/picsum-1.png",
      content:
        "Le passage latin classique qui ne vieillit jamais, apprécie autant (ou aussi peu) le lorem ipsum que vous pouvez manipuler avec notre générateur de texte de remplissage facile à utiliser.",
      createAt: new Date(),
    },
    {
      id: "006",
      title:
        "Des yeux qui font baisser les miens un rire qui se perd sur sa bouche voilà le portrait sans retouche de l'homme auquel j'appartiens.",
      thumbnail: "/picsum-1.png",
      content:
        "Le passage latin classique qui ne vieillit jamais, apprécie autant (ou aussi peu) le lorem ipsum que vous pouvez manipuler avec notre générateur de texte de remplissage facile à utiliser.",
      createAt: new Date(),
    },
  ];

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">NEWS DASHBOARD</h2>
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
              <span>Add news or blog</span>
            </button>
          </div>
        </div>
        <div className="my-8 pb-4 overflow-x-scroll [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-gray-600">
          <table className="w-full">
            <thead>
              <tr className="*:p-4 *:text-left">
                <th>News title</th>
                <th>Content</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {news.map((item) => (
                <tr
                  key={item.id}
                  className="*:p-0 [&_div]:p-4 [&_div]:text-nowrap [&_div]:text-ellipsis [&_div]:overflow-hidden"
                >
                  <td>
                    <div className="w-80">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-8 aspect-square object-cover inline mr-2"
                      />
                      <span>{item.title}</span>
                    </div>
                  </td>
                  <td>
                    <div className="w-96">{item.content}</div>
                  </td>
                  <td>
                    <div className="w-32">{item.createAt.toLocaleDateString()}</div>
                  </td>
                  <td>
                    <div className="w-32 *:mr-4 *:cursor-pointer">
                      <Link href={`/admin/news/${item.id}`}>
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
      </div>
    </div>
  );
}
