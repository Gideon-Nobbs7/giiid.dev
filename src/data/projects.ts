export type Project = {
  slug: string;
  index: string;
  title: string;
  blurb: string[];
  story: string[];
  architecture: string[];
  edgeCases: { title: string; body: string }[];
  rationale: { title: string; body: string }[];
  stack: string[];
  role: string;
  scale: string[];
  repo?: { label: string; href: string };
  screenshot?: { src: string; width: number; height: number };
  diagram: "edunexus" | "midas-core" | "adventurelog";
};

export const projects: Project[] = [
  {
    slug: "edunexus",
    index: "01",
    title: "EDUNEXUS",
    blurb: [
      "A school information management system that runs a Ugandan school — enrollment, transport, term openings, finance — handling hundreds of API requests a day. The interesting part isn't the volume: six different roles, from drivers to the bursar, each see only what their job touches, enforced by granular permission checks on every protected resource.",
      "Fees that used to be collected by hand now flow through a payment gateway — 5,000+ transactions per school term, over UGX 10M processed with full integrity, and revenue collection up about 30%. Query work cut API latency by 25% and retired a recurring class of production errors.",
      "There's an 18-page architecture document behind this system. The edge cases in it are the real story.",
    ],
    story: [
      "Edunexus is a school information management system living behind a REST API, and it quietly carries the whole academic year: enrollment, academics, transport booking, beginning-of-term clearance, and finance. It handles hundreds of API requests a day, and the traffic was never the interesting problem. The interesting problem was that one school means six very different kinds of people — administrators, teachers, drivers, students, a transport manager, and a bursar — and each one should only ever see what their role allows.",
      "So access control became a real subsystem instead of an afterthought. A custom RBAC module checks every request against a permission table that maps HTTP method and endpoint path to roles, and a separate page model controls what the frontend even shows each user. Coverage is complete rather than assumed, and role changes are data-driven — they happen through the admin panel, not code changes.",
      "The finance module was its own project within a project. Fees are paid through the SchoolPay gateway, which means inbound payment notifications, outbound payment initiation, and daily reconciliation all have to line up. Over a school term the system processed 5,000+ transactions and over UGX 10M in payments with 100% data integrity, and revenue collection rose by about 30%.",
      "The performance work came when production started complaining. Digging through the PostgreSQL queries, removing the expensive ones, and enforcing one consistent schema across environments dropped API latency by 25% and stopped a recurring class of database errors. I also deployed and maintained it end to end — staging on a Linux VPS with Nginx and Gunicorn, production on AWS.",
    ],
    architecture: [
      "Gunicorn runs the whole API with four Uvicorn workers. HTTP and WebSockets both land on the same Channels ProtocolTypeRouter, so the real-time layer lives in the same codebase and deployment as the REST API instead of on a separate server.",
      "Redis does two jobs at once — it's the Celery message broker and the Django Channels channel layer. Long-running work (report card PDFs, bulk fee assignment, payment status polling) is queued to Celery workers — four of them, with a database-backed beat schedule for the periodic jobs — and when a job finishes, a WebSocket message tells the right browser \"report ready\" without any polling.",
      "Everything is containerized with Docker Compose: a web service running the Django image under Gunicorn and Uvicorn, celery and celery-beat services running from the same image, a PostgreSQL 15 database with a persistent volume, and a Redis 7 instance exposed only internally. Secrets arrive by environment variables, never by commit.",
    ],
    edgeCases: [
      {
        title: "The same payment notified twice",
        body: "Payment gateways retry webhooks. SchoolPay can tell us about one payment more than once, so every transaction carries a unique reference from the gateway and reconciliation is built around it — double notification is handled, not hoped away.",
      },
      {
        title: "Fee deadline day",
        body: "Fifty parents paying at once. The requirement was explicit: every request handled with no data corruption, every payment getting its own reference. That day is the reason payments are treated like money end to end.",
      },
      {
        title: "A worker dies mid-report",
        body: "Generating report cards for 500 students is queued immediately, and if the Celery worker crashes partway, the task is retried automatically and the generated output is idempotent — the user is told over WebSocket when it's actually ready.",
      },
      {
        title: "Illegal status jumps",
        body: "You can't move an admission from pending to graduated in one step. Valid state transitions are enforced at the model layer, so illegal jumps are refused before they ever reach a view.",
      },
      {
        title: "Token replay after logout",
        body: "Access tokens are short-lived and refresh tokens extend sessions, but logout has to mean something. Token blacklisting makes replayed tokens fail with a 401, and every sensitive mutation lands in an audit log with before/after field values.",
      },
      {
        title: "Redis goes down",
        body: "Redis serves two masters — Celery and Channels — so its loss kills background tasks and real-time updates together. Persistence and high availability are configured for it precisely because it's a single point of failure with a single fix.",
      },
    ],
    rationale: [
      {
        title: "Modular monolith, not microservices",
        body: "Each school runs its own single-tenant deployment, and the people operating it aren't running a platform team. One Django deployment split into bounded apps (enrollment, academics, finance, bot, transportation, rbac, bootstrap) keeps Docker Compose simple, kills distributed transaction complexity, and still leaves clean boundaries if a module ever needs extracting.",
      },
      {
        title: "JWT over sessions",
        body: "The clients are a React SPA now and mobile apps later. Session auth would mean sticky sessions or a shared session store; stateless tokens scale horizontally for free and behave identically from a browser or a phone. Short-lived access tokens plus a blacklist handle the revocation gap.",
      },
      {
        title: "Custom RBAC over Django's built-ins",
        body: "Django's default permissions stop at model level — add, change, delete, view. This system needs method-plus-path granularity on APIs and per-role visibility on frontend pages, so roles, permissions, and pages are data-driven tables managed through the admin panel without code changes.",
      },
      {
        title: "One Redis, one process group",
        body: "Redis as both broker and channel layer means one service to install and monitor instead of two. Gunicorn with Uvicorn workers serving HTTP and WebSockets from the same ASGI app means real-time features can't drift away from the REST API.",
      },
    ],
    stack: ["Django", "DRF", "PostgreSQL", "Redis", "Celery", "Docker"],
    role: "Backend Engineer",
    scale: [
      "6 roles · 100% permission coverage",
      "5,000+ payments per term · UGX 10M+ processed",
      "-25% API latency",
    ],
    screenshot: { src: "/assets/projects/edunexus.webp", width: 1200, height: 592 },
    diagram: "edunexus",
  },
  {
    slug: "midas-core",
    index: "02",
    title: "MIDAS CORE",
    blurb: [
      "A J.P. Morgan job simulation where the task was the core of a platform that pays U.S. farmers for crops. Thousands of transactions land on a Kafka stream every day, and the failure that matters is a single malformed message corrupting someone's balance.",
      "A payments engine's real job is saying no — to a malformed message, a duplicate, an event that arrives out of order — before it touches state. That's the part I built: validation at the gate, real-time balance and incentive updates, all held to a 100% correctness bar with tests.",
    ],
    story: [
      "Midas Core was a J.P. Morgan simulation, and it asked for something disciplined: build the engine that processes payments for crops sold by U.S. farmers. Thousands of transactions arrive each day on a Kafka stream, and at that volume the failure that matters is not load — it's one malformed message quietly corrupting a balance.",
      "I treated validation as the gate, not the chore. The Spring Boot listener deserializes and validates every message before anything touches state, and validated transactions are persisted in real time through JPA/Hibernate into an H2 relational store. Deserialization accuracy sat at 100% — the bar was non-negotiable, so enforcement lived in unit and integration tests that ran on every change.",
      "Balances were the second discipline. Sender and recipient balances update together, with dynamic incentive adjustments baked into the same flow, so every processed transaction ends in a financially correct state. The whole solution was containerized with Docker and version-controlled with Git — clean ownership that anyone could still run.",
    ],
    architecture: [
      "Transactions enter through a Kafka stream and are consumed by a Spring Boot listener. The listener's first job is refusal: deserialize and validate before anything writes, so a malformed message is rejected at the boundary instead of polluting state.",
      "Validated transactions persist through JPA/Hibernate — an entity mapping that keeps the persistence path real even though the simulation runs on an embedded H2 store. H2 keeps the system runnable anywhere; the JPA layer keeps it honest about what a production database would need.",
      "Persistence feeds the balance update step: sender and recipient balances move with the incentive adjustment as one unit of work. The Docker boundary wraps the whole pipeline so the container is the deployment story, and tests are the guardrail that keeps the 100% correctness bar from decaying.",
    ],
    edgeCases: [
      {
        title: "A message that will not deserialize",
        body: "One corrupt payload shouldn't take down the stream. Deserialization failures are caught and rejected before any state is touched — the listener treats every message as guilty until proven valid.",
      },
      {
        title: "A message delivered twice",
        body: "Streams redeliver. The persistence path has to handle a duplicate without double-counting a farmer's payment, which is exactly the kind of case the validation-and-persist flow is built around.",
      },
      {
        title: "Sender and recipient out of step",
        body: "If a balance update partially applied, the recipient could see money that never left the sender. Both sides move inside the same unit of work, with the incentive recalculation riding along.",
      },
      {
        title: "Money and floating point",
        body: "Cents don't survive floating point math. Amounts are handled as discrete units because a rounding error in a balance is a real person's loss, not a rounding error.",
      },
    ],
    rationale: [
      {
        title: "Why Kafka at the front door",
        body: "A durable, ordered stream decouples the flow of incoming transactions from processing speed. When volume spikes, the backlog is safe — the listener processes at its own pace instead of the producers'.",
      },
      {
        title: "Why validate before you persist",
        body: "Once bad data touches a database, it breeds: downstream consumers trust it, reports aggregate it, and someone has to clean it up by hand. Rejecting at the boundary is cheap; repairing later is not.",
      },
      {
        title: "Why JPA and a real persistence path",
        body: "Even in a simulation, persistence is the part that becomes terrifying in production. Typed entity mapping keeps the write path honest, testable, and ready to point at a real database.",
      },
      {
        title: "Why Docker from day one",
        body: "A payment engine no one can run is a payment engine no one can review. Containerizing it made the whole pipeline reproducible, which is how ownership and collaboration stay compatible.",
      },
    ],
    stack: ["Spring Boot", "Kafka", "JPA/Hibernate", "H2", "Docker"],
    role: "Software Engineer · J.P. Morgan Simulation",
    scale: [
      "Thousands of transactions/day",
      "100% deserialization accuracy",
      "100% financial correctness",
    ],
    repo: {
      label: "Code Repository",
      href: "https://github.com/Gideon-Nobbs7/forage-midas",
    },
    diagram: "midas-core",
  },
  {
    slug: "adventurelog",
    index: "03",
    title: "ADVENTURELOG",
    blurb: [
      "An open-source travel tracker with a real user base — backpackers log trips, pin visited countries on a world map, and plan itineraries collaboratively. It's the kind of project where the geospatial part is the interesting one: adventures, countries, and regions are stored and queried with PostGIS.",
      "The world-travel book is the hard part — deciding whether a trip sits inside a country's actual borders is a spatial query, not a lookup table. That question is why I wanted to work on the backend.",
    ],
    story: [
      "AdventureLog is an open-source travel tracker, and it's a genuinely useful product rather than a demo: people log the places they've been, pin them on a world map, and plan trips together through shared itineraries. The reason I picked it up is the geospatial layer — adventures, countries, and regions are the product, so they're stored and queried with PostGIS instead of being treated as coordinates bolted onto a table.",
      "My work is on the backend, contributing together with the AdventureLog community. It's Django and Django REST Framework on PostGIS, with authentication handled through AllAuth, and it's the kind of codebase where the data model has to be right because someone's entire travel history depends on it.",
      "Because the project is self-hostable, the deployment story matters almost as much as the application: Docker Compose for the standard path, Traefik for reverse proxying, a Kubernetes kustomization manifest for people who want that, and an automated backup script so a traveler's history isn't one server failure away from vanishing.",
    ],
    architecture: [
      "The SvelteKit client talks to the Django REST API, which handles authentication through AllAuth and serves both the REST endpoints and the map data the client renders with MapLibre.",
      "PostGIS is where the interesting decisions happen. Adventures, countries, and regions are stored as geometry, and the world-travel book — which countries you've visited, which regions of a country — comes from spatial queries over a world dataset rather than hand-maintained lookup tables.",
      "Public and private adventures, shared itineraries, and collaborator access all route through the API's permission layer, so what you share is a deliberate choice, not a default.",
      "The self-host rail wraps the whole thing: Docker Compose or a Kubernetes manifest for the runtime, Traefik in front, and backup.sh keeping the data story honest.",
    ],
    edgeCases: [
      {
        title: "Private stays private",
        body: "An adventure can be public or private, and shared with specific people. The failure mode is a private trip leaking through a public link or a collaborator listing — so read access is checked per request, not once at login.",
      },
      {
        title: "The world dataset drifts",
        body: "Countries, regions, and borders come from the countries-states-cities world dataset, and datasets change. A user's recorded history must survive a region being renamed or restructured — references stay consistent even when geography doesn't.",
      },
      {
        title: "Two people, one itinerary",
        body: "Collaborative planning means someone can be editing a trip while a collaborator edits the same one. Concurrent edits have to merge or be rejected deliberately, never silently overwritten.",
      },
      {
        title: "The backup has to restore",
        body: "backup.sh exists because losing a traveler's history is not acceptable. A backup you've never restored is a wish, not a backup — the script and the restore path are part of the same story.",
      },
      {
        title: "Off the map",
        body: "Travelers go places without connectivity. The map and itineraries have to keep working off-grid instead of depending on live tile servers.",
      },
    ],
    rationale: [
      {
        title: "Why PostGIS",
        body: "Geography is the product. Knowing which country a coordinate falls in, which regions you've visited, and what's near an adventure are spatial problems, and PostGIS answers them at the database level instead of in application code.",
      },
      {
        title: "Why Django on an open-source project",
        body: "The project comes with a mature Django codebase, and the ORM, migrations, admin, and GeoDjango support map cleanly onto relational data with a spatial layer attached. Middle of the road, thoroughly proven, easy for new contributors to pick up.",
      },
      {
        title: "Why self-hostable is a feature",
        body: "The point of an open travel tracker is that you own your data. Docker, Traefik, Kubernetes, and the backup script exist so running your own instance is a real option, not a promise.",
      },
      {
        title: "Why AllAuth for auth",
        body: "Authentication is a solved problem with well-known failure modes. AllAuth brings battle-tested session and account flows so the project invests its time in travel features, not reset-password edge cases.",
      },
    ],
    stack: ["Django", "DRF", "PostGIS", "Docker"],
    role: "Backend Contributor · Open Source",
    scale: ["Self-hostable", "1,600+ commits in my fork", "PostGIS spatial queries"],
    screenshot: { src: "/assets/projects/adventurelog.webp", width: 1200, height: 577 },
    repo: {
      label: "Code Repository",
      href: "https://github.com/Gideon-Nobbs7/AdventureLog",
    },
    diagram: "adventurelog",
  },
];