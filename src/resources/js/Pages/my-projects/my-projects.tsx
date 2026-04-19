import { useMemo, useState, useEffect, type ReactNode } from "react";
import { Head } from "@inertiajs/react";
import "@css/pages/my-projects.css";

type ProjectStatus = "ONLINE" | "MANTENIMIENTO" | "ACTUALIZACION";

interface Project {
	id: number;
	title: string;
	client: string;
	description: string;
	achievements: string[];
	tech: string[];
	status: ProjectStatus;
	year: string;
	emoji: string;
	color: string;
	link: string;
}

interface Star {
	id: number;
	x: number;
	y: number;
	size: number;
	delay: number;
}

const PROJECTS: Project[] = [
	{
		id: 1,
		title: "Plataforma de Reservas",
		client: "Cliente: cadena hotelera nacional",
		description:
			"Sistema de reservas multi-sede con panel de administracion, calendario en tiempo real y pagos integrados.",
		achievements: [
			"Reduccion del 38% en llamadas manuales de reservas",
			"Panel interno para recepcion y finanzas",
			"Automatizacion de confirmaciones por email",
		],
		tech: ["Laravel", "React", "TypeScript", "MySQL"],
		status: "ONLINE",
		year: "2024",
		emoji: "🏨",
		color: "#00ffff",
		link: "#",
	},
	{
		id: 2,
		title: "Portal de RRHH",
		client: "Cliente: empresa industrial",
		description:
			"Portal para gestionar vacaciones, documentos y flujos de aprobacion con perfiles por rol.",
		achievements: [
			"Digitalizacion de 12 procesos internos",
			"Firma y trazabilidad de documentos",
			"Control de permisos por departamento",
		],
		tech: ["PHP", "Laravel", "PostgreSQL", "Docker"],
		status: "MANTENIMIENTO",
		year: "2023",
		emoji: "🗂",
		color: "#ff00ff",
		link: "#",
	},
	{
		id: 3,
		title: "Dashboard de Analitica Comercial",
		client: "Cliente: ecommerce B2B",
		description:
			"Cuadros de mando para ventas, conversion y rendimiento de catalogo con exportacion de reportes.",
		achievements: [
			"Visibilidad diaria de KPIs para direccion",
			"Alertas automaticas de caidas de conversion",
			"Reportes PDF para reuniones semanales",
		],
		tech: ["React", "Node.js", "Charts", "CI/CD"],
		status: "ONLINE",
		year: "2022",
		emoji: "📈",
		color: "#ffff00",
		link: "#",
	},
	{
		id: 4,
		title: "Migracion de Monolito a Servicios",
		client: "Cliente: startup SaaS",
		description:
			"Refactor de arquitectura para mejorar despliegues, observabilidad y tiempos de respuesta.",
		achievements: [
			"Bajada de latencia media en un 27%",
			"Despliegues mas seguros con pipelines",
			"Documentacion tecnica para onboarding",
		],
		tech: ["Laravel", "Redis", "Queues", "AWS"],
		status: "ACTUALIZACION",
		year: "2021",
		emoji: "⚙️",
		color: "#00ff00",
		link: "#",
	},
];

const BADGES = [
	"FULLSTACK\nDEV",
	"LARAVEL\nPOWER",
	"REACT\nACTIVE",
	"DEPLOY\nREADY",
];

const NAV_ITEMS = [
	["🏠", "INICIO", "/"],
	["💼", "PROYECTOS", "/my-projects"],
	["👤", "SOBRE MI", "/about-me"],
	["🔎", "BUSCADOR", "/search"],
] as const;

function Marquee({ children, speed = 20 }: { children: ReactNode; speed?: number }) {
	return (
		<div className="retro-marquee-wrap">
			<span className="retro-marquee" style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}>
				{children} &nbsp;|&nbsp; {children}
			</span>
		</div>
	);
}

function VisitCounter({ count }: { count: number }) {
	return (
		<div className="retro-counter" aria-label={`Contador de visitas ${count}`}>
			{String(count)
				.padStart(6, "0")
				.split("")
				.map((digit, i) => (
					<span key={`${digit}-${i}`} className="retro-counter-digit">
						{digit}
					</span>
				))}
		</div>
	);
}

function Stars() {
	const stars = useMemo<Star[]>(
		() =>
			Array.from({ length: 60 }, (_, i) => ({
				id: i,
				x: Math.random() * 100,
				y: Math.random() * 100,
				size: Math.random() * 3 + 1,
				delay: Math.random() * 3,
			})),
		[],
	);

	return (
		<div className="retro-stars" aria-hidden="true">
			{stars.map((star) => (
				<span
					key={star.id}
					className="retro-star"
					style={{
						"--star-x": `${star.x}%`,
						"--star-y": `${star.y}%`,
						"--star-size": `${star.size}px`,
						"--star-delay": `${star.delay}s`,
					} as React.CSSProperties}
				/>
			))}
		</div>
	);
}

function ProjectCard({ project }: { project: Project }) {
	const statusClass = {
		ONLINE: "is-online",
		MANTENIMIENTO: "is-maintenance",
		ACTUALIZACION: "is-update",
	}[project.status];

	return (
		<article className="retro-project-card" style={{ "--project-color": project.color } as React.CSSProperties}>
			<div className="retro-project-titlebar">
				<span className="retro-project-titlebar-text">
					{project.emoji} {project.title}
				</span>
				<div className="retro-project-controls" aria-hidden="true">
					<span>_</span>
					<span>□</span>
					<span>✕</span>
				</div>
			</div>

			<div className="retro-project-content">
				<div className="retro-project-meta">
					<span className={`retro-project-status-dot ${statusClass}`} />
					<span className={`retro-project-status ${statusClass}`}>[{project.status}]</span>
					<span className="retro-project-year">Año: {project.year}</span>
				</div>

				<p className="retro-project-client">{project.client}</p>
				<p className="retro-project-description">{project.description}</p>

				<ul className="retro-project-achievements">
					{project.achievements.map((achievement) => (
						<li key={achievement}>{achievement}</li>
					))}
				</ul>

				<div className="retro-project-tech">
					{project.tech.map((tech) => (
						<span key={tech} className="retro-tech-pill">
							{tech}
						</span>
					))}
				</div>

				<div className="retro-project-footer">
					<span className="retro-project-label">Case study tecnico</span>
					<a href={project.link} className="retro-project-link">
						[[ VER PROYECTO ]]
					</a>
				</div>
			</div>
		</article>
	);
}

export default function MyProjects() {
	const [visits, setVisits] = useState(42069);
	const [time, setTime] = useState(new Date());
	const [showAlert, setShowAlert] = useState(true);

	useEffect(() => {
		const timer = setInterval(() => setTime(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		setVisits((value) => value + Math.floor(Math.random() * 3));
	}, []);

	return (
		<>
			<Head title="~*~ Mis Trabajos de Programacion ~*~" />

			<div className="retro-page">
				<Stars />

				{showAlert && (
					<div className="retro-modal-overlay">
						<div className="retro-modal">
							<div className="retro-modal-titlebar">
								<span>⚠ Mensaje del Sistema</span>
							</div>
							<div className="retro-modal-body">
								<div className="retro-modal-emoji">💾</div>
								<p className="retro-modal-title">Portfolio de trabajos reales</p>
								<p className="retro-modal-text">
									Aqui puedes ver proyectos desarrollados en mi trayectoria como programador.
									<br />
									Formato noventero, experiencia profesional real.
								</p>
								<button className="retro-btn" type="button" onClick={() => setShowAlert(false)}>
									ENTRAR
								</button>
							</div>
						</div>
					</div>
				)}

				<div className="retro-marquee-bar">
					<Marquee speed={20}>
						PORTFOLIO PROFESIONAL | PROYECTOS ENTREGADOS | LARAVEL + REACT + TYPESCRIPT | VISITANTE #{visits.toLocaleString()}
					</Marquee>
				</div>

				<header className="retro-header">
					<div className="retro-header-icons" aria-hidden="true">
						<span>✨</span>
						<span>🌐</span>
						<span>✨</span>
					</div>
					<h1 className="retro-main-title">Mis Trabajos Como Programador</h1>
					<p className="retro-subtitle">Implementaciones reales para negocio, producto y operaciones</p>
					<div className="retro-header-divider" />
					<p className="retro-webmaster-line">
						Webmaster: TU_NOMBRE_AQUI | Email: dev@portfolio.com | Hora local: {time.toLocaleTimeString("es-ES")}
					</p>
				</header>

				<div className="retro-layout">
					<aside className="retro-sidebar">
						<section className="retro-sidebar-box retro-visit-box">
							<p className="retro-sidebar-title">Visitas Totales</p>
							<VisitCounter count={visits} />
						</section>

						<section className="retro-sidebar-box retro-nav-box">
							<div className="retro-box-titlebar">📁 NAVEGACION</div>
							{NAV_ITEMS.map(([icon, label, href]) => (
								<a key={label} href={href} className="retro-nav-link">
									{icon} {label}
								</a>
							))}
						</section>

						<section className="retro-sidebar-box retro-badges-box">
							<p className="retro-badges-title">mis badges</p>
							<div className="retro-badges-grid">
								{BADGES.map((badge) => (
									<span key={badge} className="retro-badge">
										{badge}
									</span>
								))}
							</div>
						</section>

						<section className="retro-sidebar-box retro-construction-box">
							<div className="retro-construction-icon" aria-hidden="true">
								🚧
							</div>
							<p>
								Seccion en mejora continua
								<br />
								Nuevos trabajos pronto
							</p>
						</section>
					</aside>

					<main className="retro-content">
						<div className="retro-content-head">
							<h2>PROYECTOS ENTREGADOS</h2>
							<p>Historico de soluciones construidas para clientes y equipos</p>
						</div>

						<p className="retro-intro-copy">
							Esta seccion resume proyectos en los que he participado durante mi trayectoria.
							Incluye contexto de negocio, aportaciones tecnicas y resultados obtenidos.
							<br />
							<span>Todo con estilo old school, pero con impacto real.</span>
						</p>

						<div className="retro-project-list">
							{PROJECTS.map((project) => (
								<ProjectCard key={project.id} project={project} />
							))}
						</div>

						<div className="retro-rainbow-separator" />

						<section className="retro-cta-box">
							<p className="retro-cta-title">¿Quieres ver mas detalles tecnicos?</p>
							<p className="retro-cta-copy">Puedo compartir arquitectura, retos y decisiones de cada trabajo.</p>
							<button className="retro-btn" type="button">
								SOLICITAR INFO
							</button>
						</section>
					</main>
				</div>

				<footer className="retro-footer">
					<div className="retro-footer-divider" />
					<p>© 2026 TU_NOMBRE_AQUI - Portafolio de Proyectos</p>
					<p>Construido con Laravel + Inertia + React + TypeScript</p>
					<p className="retro-footer-highlight">Gracias por visitar este archivo historico de trabajos</p>
				</footer>
			</div>
		</>
	);
}
