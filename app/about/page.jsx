import Link from "next/link";
import React from "react";

const AboutPage = () => {
  return (
    <div>
      <h1>About</h1>
      <p>This is an app to find the latest DJ and other musical events.</p>
      <p>Version: 1.0.0</p>
      <Link href="/">Home</Link>
    </div>
  );
};

export default AboutPage;
