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
