import './About.css';

function About() {
  return <div className="about"><h1>Bienvenue sur CinéSphère</h1><br />
    <p>Ceci n'est pas un site de streaming illégal, puisqu'il n'est pas possible d'y regarder un film.</p><br />
    <img
      src='../../logo.png'
      alt='logo'
      className="logo_about"
    />
    <p>Ce site a été créé par David Goldrajch, Sacha Le Dily et Alexis Noé</p><br />
  </div>;
}

export default About;
