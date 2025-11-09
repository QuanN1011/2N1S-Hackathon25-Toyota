import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
        {/* Footer content */}
        <p>Contact us: nquan1011@gmail.com · 214-404-6265</p>
        {/*update to current date*/}
        <p>© {new Date().getFullYear()} FindYoToyota. All rights reserved.</p>
    </footer>
  );
}