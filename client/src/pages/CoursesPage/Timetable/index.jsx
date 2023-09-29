import Heading from "components/Heading";
import style from "./Timetable.module.scss";

const Timetable = () => {
  // Call API bla bla

  return (
    <section className={style.timetable}>
      <div className="container">
        <Heading Tag="h2" extra subcontent="--- WELCOME TO">
          TIME TABLE
        </Heading>
        <div>
          <table>
            <thead>
              <tr>
                <th>MONDAY</th>
                <th>TUESDAY</th>
                <th>WEDNESDAY</th>
                <th>THURSDAY</th>
                <th>FRIDAY</th>
                <th>SATURDAY</th>
                <th>SUNDAY</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSkJ3HjUwAS95OCjS5RB-4PVRm-bcJXRGAFYENeywxYecvK7UOf)",
                    }}
                  >
                    Sleep
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSkJ3HjUwAS95OCjS5RB-4PVRm-bcJXRGAFYENeywxYecvK7UOf)",
                    }}
                  >
                    Sleep
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSkJ3HjUwAS95OCjS5RB-4PVRm-bcJXRGAFYENeywxYecvK7UOf)",
                    }}
                  >
                    Sleep
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSkJ3HjUwAS95OCjS5RB-4PVRm-bcJXRGAFYENeywxYecvK7UOf)",
                    }}
                  >
                    Sleep
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Timetable;
