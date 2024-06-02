import clsx from "clsx";
import Link from "next/link";
import { GrView } from "react-icons/gr";
import { MdMarkEmailRead, MdMarkEmailUnread } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";

export default function RegistersDashboardPage() {
  // Fetch data
  const registers = [
    {
      id: "001",
      course: "Introduction to Time Travel 101",
      thumbnail: "/picsum-2.png",
      name: "Tanya von Degurechaff",
      email: "degurechaff@nz.de",
      phone: "0123456789",
      message:
        "Wenn es einen Gott gibt, der diese Welt regiert, dann ist er ein strenges, ernstes und definitiv gutes Wesen. Ein Wesen, das viel zu groß ist. Gott zwingt uns immer wieder, uns diesen grausamen Schicksalen zu stellen. Als wären das die Regeln dieser Welt! Oh, Gott ... Ich werde euch in winzige Stücke schneiden und euch den Schweinen zum Fraß vorwerfen! Unser Schlachtfeld ist kein Ort für dieses Stück Scheiße, Gott! Ich denke, es ist Zeit, dass wir Gottes Werk übernehmen. Wir Soldaten werden Gottes Platz einnehmen. Macht den arroganten Arsch, Gott, arbeitslos! Also gut, Truppen ... Es ist Zeit für den Krieg",
      status: "Read",
    },
    {
      id: "002",
      course: "Introduction to Time Travel 101",
      thumbnail: "/picsum-2.png",
      name: "Tanya von Degurechaff",
      email: "degurechaff@nz.de",
      phone: "0123456789",
      message:
        "Wenn es einen Gott gibt, der diese Welt regiert, dann ist er ein strenges, ernstes und definitiv gutes Wesen. Ein Wesen, das viel zu groß ist. Gott zwingt uns immer wieder, uns diesen grausamen Schicksalen zu stellen. Als wären das die Regeln dieser Welt! Oh, Gott ... Ich werde euch in winzige Stücke schneiden und euch den Schweinen zum Fraß vorwerfen! Unser Schlachtfeld ist kein Ort für dieses Stück Scheiße, Gott! Ich denke, es ist Zeit, dass wir Gottes Werk übernehmen. Wir Soldaten werden Gottes Platz einnehmen. Macht den arroganten Arsch, Gott, arbeitslos! Also gut, Truppen ... Es ist Zeit für den Krieg",
      status: "Unread",
    },
    {
      id: "003",
      course: "Introduction to Time Travel 101",
      thumbnail: "/picsum-2.png",
      name: "Tanya von Degurechaff",
      email: "degurechaff@nz.de",
      phone: "0123456789",
      message:
        "Wenn es einen Gott gibt, der diese Welt regiert, dann ist er ein strenges, ernstes und definitiv gutes Wesen. Ein Wesen, das viel zu groß ist. Gott zwingt uns immer wieder, uns diesen grausamen Schicksalen zu stellen. Als wären das die Regeln dieser Welt! Oh, Gott ... Ich werde euch in winzige Stücke schneiden und euch den Schweinen zum Fraß vorwerfen! Unser Schlachtfeld ist kein Ort für dieses Stück Scheiße, Gott! Ich denke, es ist Zeit, dass wir Gottes Werk übernehmen. Wir Soldaten werden Gottes Platz einnehmen. Macht den arroganten Arsch, Gott, arbeitslos! Also gut, Truppen ... Es ist Zeit für den Krieg",
      status: "Read",
    },
    {
      id: "004",
      course: "Introduction to Time Travel 101",
      thumbnail: "/picsum-2.png",
      name: "Tanya von Degurechaff",
      email: "degurechaff@nz.de",
      phone: "0123456789",
      message:
        "Wenn es einen Gott gibt, der diese Welt regiert, dann ist er ein strenges, ernstes und definitiv gutes Wesen. Ein Wesen, das viel zu groß ist. Gott zwingt uns immer wieder, uns diesen grausamen Schicksalen zu stellen. Als wären das die Regeln dieser Welt! Oh, Gott ... Ich werde euch in winzige Stücke schneiden und euch den Schweinen zum Fraß vorwerfen! Unser Schlachtfeld ist kein Ort für dieses Stück Scheiße, Gott! Ich denke, es ist Zeit, dass wir Gottes Werk übernehmen. Wir Soldaten werden Gottes Platz einnehmen. Macht den arroganten Arsch, Gott, arbeitslos! Also gut, Truppen ... Es ist Zeit für den Krieg",
      status: "Unread",
    },
    {
      id: "005",
      course: "Introduction to Time Travel 101",
      thumbnail: "/picsum-2.png",
      name: "Tanya von Degurechaff",
      email: "degurechaff@nz.de",
      phone: "0123456789",
      message:
        "Wenn es einen Gott gibt, der diese Welt regiert, dann ist er ein strenges, ernstes und definitiv gutes Wesen. Ein Wesen, das viel zu groß ist. Gott zwingt uns immer wieder, uns diesen grausamen Schicksalen zu stellen. Als wären das die Regeln dieser Welt! Oh, Gott ... Ich werde euch in winzige Stücke schneiden und euch den Schweinen zum Fraß vorwerfen! Unser Schlachtfeld ist kein Ort für dieses Stück Scheiße, Gott! Ich denke, es ist Zeit, dass wir Gottes Werk übernehmen. Wir Soldaten werden Gottes Platz einnehmen. Macht den arroganten Arsch, Gott, arbeitslos! Also gut, Truppen ... Es ist Zeit für den Krieg",
      status: "Read",
    },
    {
      id: "006",
      course: "Introduction to Time Travel 101",
      thumbnail: "/picsum-2.png",
      name: "Tanya von Degurechaff",
      email: "degurechaff@nz.de",
      phone: "0123456789",
      message:
        "Wenn es einen Gott gibt, der diese Welt regiert, dann ist er ein strenges, ernstes und definitiv gutes Wesen. Ein Wesen, das viel zu groß ist. Gott zwingt uns immer wieder, uns diesen grausamen Schicksalen zu stellen. Als wären das die Regeln dieser Welt! Oh, Gott ... Ich werde euch in winzige Stücke schneiden und euch den Schweinen zum Fraß vorwerfen! Unser Schlachtfeld ist kein Ort für dieses Stück Scheiße, Gott! Ich denke, es ist Zeit, dass wir Gottes Werk übernehmen. Wir Soldaten werden Gottes Platz einnehmen. Macht den arroganten Arsch, Gott, arbeitslos! Also gut, Truppen ... Es ist Zeit für den Krieg",
      status: "Unread",
    },
  ];
  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">REGISTERS DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl p-6">
        <div className="flex gap-x-8">
          <div>
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
        <div className="my-8 pb-4 overflow-x-scroll [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-gray-600">
          <table>
            <thead>
              <tr className="*:p-4 *:text-left">
                <th>Course</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {registers.map((item) => (
                <tr
                  key={item.id}
                  className={clsx(
                    "*:p-0 [&_div]:p-4 [&_div]:text-nowrap [&_div]:text-ellipsis [&_div]:overflow-hidden",
                    item.status === "Unread" && "font-bold"
                  )}
                >
                  <td>
                    <div className="w-80">
                      <img
                        src={item.thumbnail}
                        alt={item.course}
                        className="w-8 aspect-square object-cover inline mr-2"
                      />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="w-64">{item.name}</div>
                  </td>
                  <td>
                    <div className="w-48">{item.email}</div>
                  </td>
                  <td>
                    <div className="w-48">{item.phone}</div>
                  </td>
                  <td>
                    <div className="w-80">{item.message}</div>
                  </td>
                  <td>
                    <div className="w-32 *:mr-4 *:cursor-pointer">
                      <Link href={`/admin/registers/${item.id}`}>
                        <GrView className="inline text-sky-400" />
                      </Link>
                      <RiDeleteBin2Fill className="inline text-red-400" />
                      {item.status === "Read" ? (
                        <MdMarkEmailUnread className="inline text-amber-500 cursor-pointer" />
                      ) : (
                        <MdMarkEmailRead className="inline text-emerald-500 cursor-pointer" />
                      )}
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
