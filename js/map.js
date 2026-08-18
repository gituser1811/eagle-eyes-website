/**
 * EAGLE EYES - INTERACTIVE GLOBAL NETWORK MAP
 * Interactive SVG Map with Qatar Hub and 13 International Source Markets
 */

document.addEventListener('DOMContentLoaded', () => {
  initGlobalNetworkMap();
});

const RECRUITMENT_MARKETS = [
  { id: 'kenya', name: 'Kenya', x: 560, y: 310, categories: 'Hospitality, Support & Facilities', region: 'Africa' },
  { id: 'uganda', name: 'Uganda', x: 540, y: 300, categories: 'Facilities, Hospitality & Support', region: 'Africa' },
  { id: 'ethiopia', name: 'Ethiopia', x: 565, y: 275, categories: 'Hospitality & Support Workforce', region: 'Africa' },
  { id: 'ghana', name: 'Ghana', x: 445, y: 280, categories: 'Technical, Skilled & Support', region: 'Africa' },
  { id: 'nigeria', name: 'Nigeria', x: 470, y: 275, categories: 'Skilled & Support Workforce', region: 'Africa' },
  { id: 'tanzania', name: 'Tanzania', x: 560, y: 330, categories: 'Facilities & Hospitality', region: 'Africa' },
  { id: 'rwanda', name: 'Rwanda', x: 535, y: 315, categories: 'Hospitality & Administration', region: 'Africa' },
  { id: 'india', name: 'India', x: 670, y: 235, categories: 'Healthcare, Technical, Culinary & Skilled', region: 'Asia' },
  { id: 'pakistan', name: 'Pakistan', x: 630, y: 215, categories: 'Technical, Skilled & Logistics', region: 'Asia' },
  { id: 'nepal', name: 'Nepal', x: 675, y: 210, categories: 'Hospitality & Facilities Support', region: 'Asia' },
  { id: 'bangladesh', name: 'Bangladesh', x: 695, y: 225, categories: 'Logistics, Skilled & Support', region: 'Asia' },
  { id: 'philippines', name: 'Philippines', x: 790, y: 280, categories: 'Healthcare, Salon, Hospitality & Office', region: 'Asia' },
  { id: 'sri-lanka', name: 'Sri Lanka', x: 670, y: 295, categories: 'Hospitality, Culinary & Administration', region: 'Asia' }
];

// Qatar Hub Coordinate
const QATAR_HUB = { name: 'Qatar (Doha - Primary Market)', x: 575, y: 218 };

function initGlobalNetworkMap() {
  const mapWrapper = document.querySelector('.map-svg-wrapper');
  const tooltip = document.querySelector('.map-tooltip');

  if (!mapWrapper || !tooltip) return;

  // Build SVG Content
  let svgHTML = `
    <svg viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="qatarGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#C5A15A" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#C5A15A" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#C5A15A" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#C5A15A" stop-opacity="0.1"/>
        </linearGradient>
      </defs>

      <!-- Stylized Simplified World Continents Outline/Shapes -->
      <g class="map-continents" fill="#141414" stroke="#222222" stroke-width="1">
        <!-- Africa simplified -->
        <path d="M 440,190 C 470,180 540,180 570,220 C 580,260 590,320 560,370 C 540,400 510,410 490,380 C 470,350 440,320 420,270 C 410,230 420,200 440,190 Z" />
        <!-- Europe simplified -->
        <path d="M 450,110 C 490,100 540,100 560,130 C 540,160 500,175 460,170 C 440,150 435,130 450,110 Z" />
        <!-- Middle East & Central Asia -->
        <path d="M 560,170 C 600,160 660,150 700,180 C 720,220 680,260 630,250 C 590,240 570,200 560,170 Z" />
        <!-- South Asia & East Asia -->
        <path d="M 650,180 C 720,160 800,170 830,220 C 810,280 750,330 700,300 C 670,270 650,230 650,180 Z" />
        <!-- Southeast Asia & Islands -->
        <path d="M 750,270 C 800,260 840,290 820,340 C 780,350 760,310 750,270 Z" />
      </g>

      <!-- Connection Lines between Qatar and Source Markets -->
      <g class="connection-lines">
  `;

  RECRUITMENT_MARKETS.forEach(market => {
    svgHTML += `
      <line 
        id="line-${market.id}" 
        x1="${QATAR_HUB.x}" y1="${QATAR_HUB.y}" 
        x2="${market.x}" y2="${market.y}" 
        stroke="url(#routeGrad)" 
        stroke-width="1.2" 
        stroke-dasharray="3 3"
        opacity="0.4"
      />
    `;
  });

  svgHTML += `</g>`;

  // Qatar Destination Hub Marker
  svgHTML += `
    <g class="hub-qatar" transform="translate(${QATAR_HUB.x}, ${QATAR_HUB.y})">
      <circle r="18" fill="url(#qatarGlow)" class="qatar-pulse" />
      <circle r="6" fill="#C5A15A" stroke="#FFFFFF" stroke-width="1.5" />
      <text x="12" y="-8" fill="#D8BD7A" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" letter-spacing="1">QATAR (HUB)</text>
    </g>
  `;

  // Source Markets Markers
  svgHTML += `<g class="market-nodes">`;
  RECRUITMENT_MARKETS.forEach(market => {
    svgHTML += `
      <g class="map-node" data-id="${market.id}" data-name="${market.name}" data-categories="${market.categories}" transform="translate(${market.x}, ${market.y})" style="cursor: pointer;">
        <circle r="10" fill="transparent" class="hit-area" />
        <circle r="4" fill="#C5A15A" class="node-dot" />
        <circle r="8" fill="none" stroke="#C5A15A" stroke-width="1" stroke-opacity="0.4" class="node-ring" />
      </g>
    `;
  });
  svgHTML += `</g></svg>`;

  mapWrapper.innerHTML = svgHTML;

  // Add Interactive Events
  const nodes = mapWrapper.querySelectorAll('.map-node');
  nodes.forEach(node => {
    const marketId = node.getAttribute('data-id');
    const name = node.getAttribute('data-name');
    const categories = node.getAttribute('data-categories');
    const line = mapWrapper.querySelector(`#line-${marketId}`);

    node.addEventListener('mouseenter', (e) => {
      // Highlight Node & Line
      node.querySelector('.node-dot').setAttribute('fill', '#FFFFFF');
      node.querySelector('.node-ring').setAttribute('stroke-opacity', '1');
      node.querySelector('.node-ring').setAttribute('r', '11');
      if (line) {
        line.setAttribute('stroke', '#C5A15A');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('opacity', '1');
      }

      // Show Tooltip
      tooltip.innerHTML = `
        <div class="map-tooltip-country">${name}</div>
        <div class="map-tooltip-categories">${categories}</div>
      `;
      tooltip.style.display = 'block';

      // Position Tooltip
      const rect = node.getBoundingClientRect();
      const parentRect = mapWrapper.getBoundingClientRect();
      tooltip.style.left = `${rect.left - parentRect.left + (rect.width / 2)}px`;
      tooltip.style.top = `${rect.top - parentRect.top}px`;

      // Highlight matching country card if present on page
      const matchingCard = document.querySelector(`.country-card[data-id="${marketId}"]`);
      if (matchingCard) {
        matchingCard.style.borderColor = 'var(--gold-primary)';
      }
    });

    node.addEventListener('mouseleave', () => {
      node.querySelector('.node-dot').setAttribute('fill', '#C5A15A');
      node.querySelector('.node-ring').setAttribute('stroke-opacity', '0.4');
      node.querySelector('.node-ring').setAttribute('r', '8');
      if (line) {
        line.setAttribute('stroke', 'url(#routeGrad)');
        line.setAttribute('stroke-width', '1.2');
        line.setAttribute('opacity', '0.4');
      }
      tooltip.style.display = 'none';

      const matchingCard = document.querySelector(`.country-card[data-id="${marketId}"]`);
      if (matchingCard) {
        matchingCard.style.borderColor = '';
      }
    });

    node.addEventListener('click', () => {
      window.location.href = `contact.html?country=${encodeURIComponent(name)}`;
    });
  });
}
