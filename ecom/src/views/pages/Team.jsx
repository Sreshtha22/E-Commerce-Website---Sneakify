import React from "react";
const TeamView = () => {
  return (
    <div className="team">
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6 text-center">Team</h1>
      </div>
      <section className="site-section services-section block__62849" id="next-section">
        <div className="container">
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center">
              {teamMembers.map((member) => (
                <div className="col-6 col-md-4 col-lg-3 mb-4 mx-2" key={member.name}>
                  <center>
                    <img
                      src={member.image}
                      style={{ width: "150px", height: "150px", borderRadius: "100%" }}
                      alt={member.name}
                    />
                    <br /><br />
                    <h3>{member.name}</h3>
                    <p style={{ fontSize: "18px" }}>{member.expertise}</p>
                    <p>{member.description}</p>
                  </center>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
const teamMembers = [
  {
    name: "Oyendrila Sett",
    image: "images/oyendrila.jpg",
    expertise: "Frontend || Backend",
    description: "She is responsible for creating the frontend and backend of the web application.",
  },
  {
    name: "Sreshtha Mukherjee",
    image: "images/sreshtha.jpg",
    expertise: "Frontend || Backend",
    description: "She is responsible for creating the frontend and backend of the web application.",
  },
  {
    name: "Swarnali Saha",
    image: "images/swarnali.jpeg",
    expertise: "Frontend || Backend",
    description: "She is responsible for creating the frontend and backend of the web application.",
  },
  {
    name: "Shuvadip Mondal",
    image: "images/Shuvadip.jpeg",
    expertise: "Frontend || Backend",
    description: "He is responsible for creating the frontend and backend of the web application.",
  },
  {
    name: "Trishita Kundu",
    image: "images/trishita.jpg",
    expertise: "Frontend || Backend",
    description: "She is responsible for creating the frontend and backend of the web application.",
  },
];
export default TeamView;