import Statistic from "@/components/partials/statistic";
import db from "@/lib/db";
import { BiSolidDirections } from "react-icons/bi";
import { BsPeopleFill, BsWechat } from "react-icons/bs";
import { FaBook, FaNewspaper } from "react-icons/fa";
import { IoIosImages } from "react-icons/io";
import { PiPhoneCallFill } from "react-icons/pi";
import { RiQuillPenFill } from "react-icons/ri";

export default async function AdminPage() {
  const navigations = await db.navigation.findMany();
  const contacts = await db.contact.findMany();
  const banners = await db.banner.findMany();
  const courses = await db.course.findMany();
  const news = await db.news.findMany();
  const messages = await db.message.findMany();
  const registers = await db.register.findMany();
  const users = await db.user.findMany();

  return (
    <div className="text-light">
      <h2 className="text-3xl mb-6">ADMIN DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl p-6">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          <Statistic
            title="navigations"
            icon={<BiSolidDirections className="inline align-middle text-xl" />}
            items={navigations}
          />
          <Statistic
            title="contacts"
            icon={<PiPhoneCallFill className="inline align-middle text-xl" />}
            items={contacts}
          />
          <Statistic
            title="banners"
            icon={<IoIosImages className="inline align-middle text-xl" />}
            items={banners}
          />
          <Statistic
            title="courses"
            icon={<FaBook className="inline align-middle text-xl" />}
            items={courses}
          />
          <Statistic
            title="news"
            icon={<FaNewspaper className="inline align-middle text-xl" />}
            items={news}
          />
          <Statistic
            title="messages"
            icon={<BsWechat className="inline align-middle text-xl" />}
            items={messages}
          />
          <Statistic
            title="registers"
            icon={<RiQuillPenFill className="inline align-middle text-xl" />}
            items={registers}
          />
          <Statistic
            title="users"
            icon={<BsPeopleFill className="inline align-middle text-xl" />}
            items={users}
          />
        </div>
      </div>
    </div>
  );
}
