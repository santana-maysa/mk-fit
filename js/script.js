const siteConfig = {
  whatsapp: '5563984119696',
  whatsappLabel: '(63) 98411-9696',
  address: 'Endereço a confirmar pela academia.<br><small>Campo demonstrativo para preenchimento.</small>',
  hours: 'Horários a confirmar pela academia.<br><small>Campo demonstrativo para preenchimento.</small>',
  instagram: '',
  maps: '',
};

const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');

const setHeaderState = () => header?.classList.toggle('scrolled', window.scrollY > 24);
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

const closeMenu = () => {
  primaryNav?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  const label = menuToggle?.querySelector('.sr-only');
  if (label) label.textContent = 'Abrir menu';
};

menuToggle?.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.querySelector('.sr-only').textContent = isOpen ? 'Fechar menu' : 'Abrir menu';
});
primaryNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('click', (event) => {
  if (primaryNav?.classList.contains('open') && !primaryNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
});

const whatsappUrl = (message) => `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
const heroIcons = {
  arrowUpRight: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H21m0 0v7.5m0-7.5L10.5 16.5M18 13.5V18A2.5 2.5 0 0 1 15.5 20h-9A2.5 2.5 0 0 1 4 17.5v-9A2.5 2.5 0 0 1 6.5 6H11"/></svg>',
  arrowDown: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 13.5-7.5 7.5-7.5-7.5M12 21V3"/></svg>',
  plus: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>',
  circle: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="8.25"/><circle cx="12" cy="12" r="2"/></svg>',
  sparkles: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m9 3 1.2 3.8L14 8l-3.8 1.2L9 13l-1.2-3.8L4 8l3.8-1.2L9 3Zm9 8 .7 2.3L21 14l-2.3.7L18 17l-.7-2.3L15 14l2.3-.7L18 11ZM5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15Z"/></svg>',
  arrowUp: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m5 11 7-7m0 0 7 7m-7-7v16"/></svg>',
};
const iconMarkup = (name) => heroIcons[name].replace('class="heroicon"', 'class="icon heroicon" width="1em" height="1em"');
document.querySelectorAll('[aria-hidden="true"]').forEach((element) => {
  const iconName = { '↗': 'arrowUpRight', '↓': 'arrowDown' }[element.textContent.trim()];
  if (iconName) element.outerHTML = iconMarkup(iconName);
});
['plus', 'arrowUpRight', 'circle', 'sparkles'].forEach((iconName, index) => {
  const element = document.querySelectorAll('.diff-icon')[index];
  if (element) element.innerHTML = iconMarkup(iconName);
});
document.querySelectorAll('.footer-links a, .back-top').forEach((link) => {
  link.innerHTML = link.innerHTML.replace('↗', iconMarkup('arrowUpRight')).replace('↑', iconMarkup('arrowUp'));
});
document.querySelectorAll('.whatsapp-link').forEach((link) => {
  link.href = whatsappUrl('Olá, gostaria de saber mais sobre a MK FIT.');
  link.target = '_blank'; link.rel = 'noreferrer';
});
document.querySelectorAll('.plan-interest').forEach((link) => {
  link.href = whatsappUrl(`Olá, gostaria de saber mais sobre o ${link.dataset.plan} da MK FIT.`);
  link.target = '_blank'; link.rel = 'noreferrer';
});
document.querySelectorAll('.config-phone').forEach((link) => { link.innerHTML = `WhatsApp: ${siteConfig.whatsappLabel} ${iconMarkup('arrowUpRight')}`; });
document.querySelector('.config-address').innerHTML = siteConfig.address;
document.querySelector('.config-hours').innerHTML = siteConfig.hours;
if (siteConfig.instagram) document.querySelectorAll('.instagram-link').forEach((link) => { link.href = siteConfig.instagram; link.target = '_blank'; link.rel = 'noreferrer'; link.innerHTML = `Instagram ${iconMarkup('arrowUpRight')}`; });
if (siteConfig.maps) document.querySelectorAll('.maps-link').forEach((link) => { link.href = siteConfig.maps; link.target = '_blank'; link.rel = 'noreferrer'; link.innerHTML = `Abrir localização no Google Maps ${iconMarkup('arrowUpRight')}`; });
document.querySelector('[data-year]').textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); currentObserver.unobserve(entry.target); }
  }), { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else revealItems.forEach((item) => item.classList.add('is-visible'));
