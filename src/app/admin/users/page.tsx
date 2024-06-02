import Link from "next/link";
import { FaCaretLeft, FaCaretRight, FaPlus } from "react-icons/fa";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";

export default function AccountDashboardPage() {
  // Fetch data
  const users = [
    { id: "000", username: "root", role: "root", createdAt: new Date() },
    { id: "001", username: "hehe", role: "admin", createdAt: new Date() },
    { id: "002", username: "hihi", role: "admin", createdAt: new Date() },
    { id: "003", username: "lmao", role: "user", createdAt: new Date() },
    { id: "004", username: "bruh", role: "user", createdAt: new Date() },
  ];

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">USERS DASHBOARD</h2>
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
              <span>Add Account</span>
            </button>
          </div>
        </div>
        <div className="my-8 pb-4 overflow-x-scroll [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-gray-600">
          <table className="w-full">
            <thead>
              <tr className="*:p-4 *:text-left">
                <th>Username</th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {users.map((item) => (
                <tr
                  key={item.id}
                  className="*:p-0 [&_div]:p-4 [&_div]:text-nowrap [&_div]:text-ellipsis [&_div]:overflow-hidden"
                >
                  <td>
                    <div className="w-32">{item.username}</div>
                  </td>
                  <td>
                    <div className="w-32">{item.role}</div>
                  </td>
                  <td>
                    <div className="w-96">{item.createdAt.toLocaleString()}</div>
                  </td>
                  <td>
                    <div className="w-32 *:mr-4 *:cursor-pointer">
                      <Link href={`/admin/account/${item.id}`}>
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
