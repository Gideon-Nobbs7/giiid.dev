import React from "react";

type BoxProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  sub?: string;
  accent?: boolean;
};

const Box = ({ x, y, width, height, label, sub, accent }: BoxProps) => (
  <g>
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={8}
      className={
        accent ? "fill-current text-theme-accent" : "fill-current text-theme-bg-elevated"
      }
      stroke="currentColor"
      strokeOpacity={0.9}
      strokeWidth={1}
    />
    <text
      x={x + width / 2}
      y={y + (sub ? 24 : height / 2)}
      textAnchor="middle"
      fontSize={12}
      fontWeight={600}
      letterSpacing={1}
      className={accent ? "fill-current text-theme-bg-black" : "fill-current text-theme-text-white"}
    >
      {label}
    </text>
    {sub && (
      <text
        x={x + width / 2}
        y={y + 40}
        textAnchor="middle"
        fontSize={10}
        letterSpacing={0.5}
        className="fill-current text-theme-text-white-muted"
      >
        {sub}
      </text>
    )}
  </g>
);

type FlowLineProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dashed?: boolean;
  accent?: boolean;
  arrow?: "start" | "end" | "both";
  markerId?: string;
};

const FlowLine = ({
  x1,
  y1,
  x2,
  y2,
  dashed,
  accent,
  arrow,
  markerId = "diagram-arrow",
}: FlowLineProps) => (
  <g>
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="currentColor"
      strokeWidth={accent ? 2 : 1}
      strokeOpacity={accent ? 1 : 0.4}
      strokeDasharray={dashed ? "4 4" : undefined}
      markerStart={arrow === "start" || arrow === "both" ? `url(#${markerId})` : undefined}
      markerEnd={arrow === "end" || arrow === "both" ? `url(#${markerId})` : undefined}
      className={accent ? "text-theme-accent" : "text-theme-text-white-muted"}
    />
  </g>
);

type FlowLabelProps = {
  x: number;
  y: number;
  children: React.ReactNode;
};

const FlowLabel = ({ x, y, children }: FlowLabelProps) => (
  <text
    x={x}
    y={y}
    textAnchor="middle"
    fontSize={9}
    letterSpacing={0.5}
    className="fill-current text-theme-text-white-muted"
  >
    {children}
  </text>
);

const EdunexusDiagram = () => (
  <svg
    viewBox="0 0 800 400"
    className="w-full h-auto select-none"
    role="img"
    aria-label="Edunexus container diagram"
  >
    <defs>
      <marker
        id="diagram-arrow"
        viewBox="0 0 8 8"
        refX={6}
        refY={4}
        markerWidth={6}
        markerHeight={6}
        orient="auto-start-reverse"
      >
        <path d="M0,0 L8,4 L0,8 z" className="fill-current text-theme-accent" />
      </marker>
    </defs>

    <rect
      x={16}
      y={16}
      width={768}
      height={368}
      rx={14}
      className="fill-transparent stroke-current text-theme-text-white-muted"
      strokeOpacity={0.4}
      strokeWidth={1}
      strokeDasharray="6 6"
    />
    <text
      x={34}
      y={38}
      fontSize={10}
      letterSpacing={2}
      className="fill-current text-theme-text-white-muted"
    >
      EDUNEX SYSTEM
    </text>

    <FlowLine x1={160} y1={126} x2={250} y2={70} accent arrow="end" />
    <FlowLabel x={172} y={108}>real-time updates [WSS]</FlowLabel>

    <Box x={30} y={110} width={130} height={64} label="WEB FRONTEND" sub="React · JavaScript" />
    <Box x={250} y={44} width={160} height={60} label="ASGI SERVER" sub="Gunicorn · Uvicorn" />
    <Box x={250} y={150} width={160} height={60} label="CELERY WORKER" sub="worker · beat" />
    <Box x={250} y={260} width={160} height={64} label="REST API" sub="Python · Django · DRF" accent />
    <Box x={560} y={44} width={160} height={60} label="REDIS" sub="Broker · channel layer" />
    <Box x={560} y={150} width={160} height={60} label="POSTGRESQL" sub="Primary database" />
    <Box x={560} y={260} width={160} height={60} label="SCHOOLPAY" sub="[External]" />

    <FlowLine x1={160} y1={164} x2={250} y2={288} accent arrow="end" />
    <FlowLabel x={180} y={224}>REST API calls [HTTPS/JSON]</FlowLabel>

    <FlowLine x1={410} y1={70} x2={560} y2={70} dashed arrow="both" />
    <FlowLabel x={475} y={58}>channel layer [Pub/Sub]</FlowLabel>

    <FlowLine x1={410} y1={154} x2={560} y2={106} dashed arrow="end" />
    <FlowLabel x={475} y={124}>queues tasks [Celery]</FlowLabel>

    <FlowLine x1={560} y1={116} x2={410} y2={172} accent arrow="end" />
    <FlowLabel x={475} y={140}>consumes tasks [Celery]</FlowLabel>

    <FlowLine x1={410} y1={180} x2={560} y2={180} dashed arrow="both" />
    <FlowLabel x={475} y={170}>reads/writes [ORM/SQL]</FlowLabel>

    <FlowLine x1={410} y1={292} x2={560} y2={180} dashed arrow="both" />
    <FlowLabel x={475} y={255}>reads/writes [ORM/SQL]</FlowLabel>

    <FlowLine x1={410} y1={320} x2={560} y2={300} accent arrow="end" />
    <FlowLabel x={475} y={292}>payments [HTTPS]</FlowLabel>
  </svg>
);

const MidasCoreDiagram = () => (
  <svg
    viewBox="0 0 520 330"
    className="w-full h-auto select-none"
    role="img"
    aria-label="Midas Core system architecture diagram"
  >
    <rect
      x={12}
      y={12}
      width={496}
      height={300}
      rx={14}
      className="fill-transparent stroke-current text-theme-text-white-muted"
      strokeOpacity={0.4}
      strokeWidth={1}
      strokeDasharray="6 6"
    />
    <text
      x={28}
      y={34}
      fontSize={10}
      letterSpacing={2}
      className="fill-current text-theme-text-white-muted"
    >
      DOCKER CONTAINER
    </text>

    <FlowLine x1={160} y1={134} x2={200} y2={134} />
    <Box x={40} y={110} width={120} height={48} label="KAFKA STREAM" sub="producer · txns" />

    <Box x={200} y={100} width={160} height={68} label="SPRING BOOT LISTENER" sub="deserialize · validate" accent />
    <FlowLine x1={360} y1={134} x2={400} y2={134} />
    <Box x={400} y={110} width={120} height={48} label="H2 · JPA" sub="persist validated" />

    <FlowLine x1={460} y1={158} x2={460} y2={226} />
    <FlowLine x1={460} y1={226} x2={360} y2={226} />
    <Box x={200} y={202} width={160} height={48} label="BALANCE UPDATE" sub="sender · recipient · incentive" />

    <FlowLine x1={280} y1={168} x2={280} y2={242} />
    <FlowLine x1={280} y1={242} x2={160} y2={242} dashed />
    <Box x={40} y={218} width={120} height={48} label="REJECTED" sub="malformed messages" />

    <text
      x={280}
      y={188}
      textAnchor="middle"
      fontSize={10}
      letterSpacing={1}
      className="fill-current text-theme-accent"
    >
      100% CORRECTNESS
    </text>
  </svg>
);

const AdventureLogDiagram = () => (
  <svg
    viewBox="0 0 520 330"
    className="w-full h-auto select-none"
    role="img"
    aria-label="AdventureLog system architecture diagram"
  >
    <FlowLine x1={140} y1={64} x2={180} y2={64} />
    <Box x={20} y={40} width={120} height={48} label="SVELTEKIT" sub="map · itineraries" />
    <Box x={180} y={28} width={170} height={72} label="DJANGO REST API" sub="AllAuth auth" accent />
    <FlowLine x1={350} y1={64} x2={390} y2={64} />
    <Box x={390} y={40} width={120} height={48} label="POSTGIS" sub="geospatial" />

    <FlowLine x1={470} y1={88} x2={470} y2={130} dashed />
    <text
      x={468}
      y={118}
      textAnchor="end"
      fontSize={10}
      letterSpacing={1}
      className="fill-current text-theme-accent"
    >
      SELF-HOST
    </text>

    <FlowLine x1={70} y1={258} x2={135} y2={258} />
    <FlowLine x1={185} y1={258} x2={250} y2={258} />
    <FlowLine x1={300} y1={258} x2={365} y2={258} />
    <FlowLine x1={415} y1={258} x2={470} y2={258} />
    <Box x={20} y={234} width={115} height={48} label="DOCKER" sub="compose" />
    <Box x={135} y={234} width={115} height={48} label="TRAEFIK" sub="reverse proxy" />
    <Box x={250} y={234} width={115} height={48} label="KUBERNETES" sub="kustomize" />
    <Box x={365} y={234} width={115} height={48} label="BACKUP.SH" sub="automated" />
  </svg>
);

const EdunexusCompactDiagram = () => (
  <svg
    viewBox="0 0 520 220"
    className="w-full h-auto select-none"
    role="img"
    aria-label="Edunexus system at a glance"
  >
    <defs>
      <marker
        id="compact-arrow-edunexus"
        viewBox="0 0 8 8"
        refX={6}
        refY={4}
        markerWidth={6}
        markerHeight={6}
        orient="auto-start-reverse"
      >
        <path d="M0,0 L8,4 L0,8 z" className="fill-current text-theme-accent" />
      </marker>
    </defs>

    <Box x={20} y={60} width={150} height={64} label="WEB FRONTEND" sub="React SPA" />
    <Box x={190} y={60} width={150} height={64} label="REST API" sub="Django · DRF" accent />
    <Box x={360} y={60} width={150} height={64} label="POSTGRESQL" sub="Primary database" />

    <FlowLine x1={170} y1={92} x2={190} y2={92} arrow="end" markerId="compact-arrow-edunexus" />
    <FlowLabel x={180} y={82}>HTTPS/JSON</FlowLabel>
    <FlowLine x1={340} y1={92} x2={360} y2={92} arrow="end" markerId="compact-arrow-edunexus" />
    <FlowLabel x={350} y={82}>ORM/SQL</FlowLabel>

    <Box x={190} y={152} width={150} height={48} label="REDIS" sub="Celery · channels" />
    <FlowLine x1={265} y1={124} x2={265} y2={152} dashed markerId="compact-arrow-edunexus" />
  </svg>
);

const MidasCoreCompactDiagram = () => (
  <svg
    viewBox="0 0 520 220"
    className="w-full h-auto select-none"
    role="img"
    aria-label="Midas Core system at a glance"
  >
    <defs>
      <marker
        id="compact-arrow-midas-core"
        viewBox="0 0 8 8"
        refX={6}
        refY={4}
        markerWidth={6}
        markerHeight={6}
        orient="auto-start-reverse"
      >
        <path d="M0,0 L8,4 L0,8 z" className="fill-current text-theme-accent" />
      </marker>
    </defs>

    <Box x={20} y={60} width={150} height={64} label="KAFKA STREAM" sub="producer · txns" />
    <Box x={190} y={60} width={150} height={64} label="SPRING BOOT" sub="listener · validate" accent />
    <Box x={360} y={60} width={150} height={64} label="H2 · JPA" sub="persist validated" />

    <FlowLine x1={170} y1={92} x2={190} y2={92} arrow="end" markerId="compact-arrow-midas-core" />
    <FlowLabel x={180} y={82}>events</FlowLabel>
    <FlowLine x1={340} y1={92} x2={360} y2={92} arrow="end" markerId="compact-arrow-midas-core" />
    <FlowLabel x={350} y={82}>persist</FlowLabel>

    <Box x={190} y={152} width={150} height={48} label="BALANCE UPDATE" sub="sender · recipient" />
    <FlowLine x1={265} y1={124} x2={265} y2={152} dashed markerId="compact-arrow-midas-core" />
  </svg>
);

const AdventureLogCompactDiagram = () => (
  <svg
    viewBox="0 0 520 220"
    className="w-full h-auto select-none"
    role="img"
    aria-label="AdventureLog system at a glance"
  >
    <defs>
      <marker
        id="compact-arrow-adventurelog"
        viewBox="0 0 8 8"
        refX={6}
        refY={4}
        markerWidth={6}
        markerHeight={6}
        orient="auto-start-reverse"
      >
        <path d="M0,0 L8,4 L0,8 z" className="fill-current text-theme-accent" />
      </marker>
    </defs>

    <Box x={20} y={60} width={150} height={64} label="SVELTEKIT" sub="map · itineraries" />
    <Box x={190} y={60} width={150} height={64} label="DJANGO API" sub="DRF · AllAuth" accent />
    <Box x={360} y={60} width={150} height={64} label="POSTGIS" sub="spatial queries" />

    <FlowLine x1={170} y1={92} x2={190} y2={92} arrow="end" markerId="compact-arrow-adventurelog" />
    <FlowLabel x={180} y={82}>HTTPS/JSON</FlowLabel>
    <FlowLine x1={340} y1={92} x2={360} y2={92} arrow="end" markerId="compact-arrow-adventurelog" />
    <FlowLabel x={350} y={82}>geometry</FlowLabel>

    <Box x={190} y={152} width={150} height={48} label="SELF-HOST" sub="Docker · Traefik" />
    <FlowLine x1={265} y1={124} x2={265} y2={152} dashed markerId="compact-arrow-adventurelog" />
  </svg>
);

export const projectDiagrams = {
  edunexus: EdunexusDiagram,
  "midas-core": MidasCoreDiagram,
  adventurelog: AdventureLogDiagram,
};

export const compactProjectDiagrams = {
  edunexus: EdunexusCompactDiagram,
  "midas-core": MidasCoreCompactDiagram,
  adventurelog: AdventureLogCompactDiagram,
};