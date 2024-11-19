import Link from "next/link";

export default function Home() {
  return (
    <main className="landing-page">
      <section className="hero">
        <div className="container">
          <h1>Welcome to Analytics Tracker</h1>
          <p>
            Monitor your web traffic effectively with integrated Google
            Analytics.
          </p>
          <Link href="/dashboard">
            <button className="cta-button">Get Started</button>
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>Real-Time Insights</h3>
              <p>
                Track your website traffic in real-time with detailed insights.
              </p>
            </div>
            <div className="feature-item">
              <h3>Custom Dashboards</h3>
              <p>Visualize data with fully customizable dashboards.</p>
            </div>
            <div className="feature-item">
              <h3>User Behavior</h3>
              <p>
                Understand user behavior to optimize your website experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
