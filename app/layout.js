// Gedeelde CSS, 1-op-1 uit de 11ty-branch
import './css/style.css';

// Zelfde <head> als base.njk in de 11ty-versie. Next zet zelf charset en viewport erbij.
export const metadata = {
	title: 'Quiz · Next.js',
	description: 'Test je kennis over de collectie van Teylers Museum.',
	icons: { icon: { url: '/favicon.svg', type: 'image/svg+xml' } },
};

// Root layout: verplicht in de App Router, bevat <html> en <body>
export default function RootLayout({ children }) {
	return (
		<html lang="nl">
			<body>
				<main>{children}</main>
			</body>
		</html>
	);
}
