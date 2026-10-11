/**
 * src/data/images.js
 * Centralized image slots for the café site.
 */

const placeholder = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNFQURCQzgiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNDOUEyN0UiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjQ4IiBmaWxsPSIjRkJGN0YxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjM1ZW0iPio8L3RleHQ+PC9zdmc+';

export const IMAGES = {
  latteArt: { src: '/images/hero-latte.webp', alt: 'Latte art' },
  interior: { src: '/images/interior.webp', alt: 'Café interior' },
  chocolatePastry: { src: '/images/chocolate-pastry.webp', alt: 'Chocolate Pastry' },
  blueberryCheesecake: { src: '/images/blueberry-cheesecake.webp', alt: 'Blueberry Cheesecake' },
  icedCoffee: { src: '/images/iced-coffee.webp', alt: 'Iced Coffee' },
  walnutBrownie: { src: '/images/walnut-brownie.webp', alt: 'Walnut Brownie' },
  paneerPanini: { src: '/images/paneer-panini.webp', alt: 'Paneer Panini' },
  cheesePoppers: { src: '/images/cheese-poppers.webp', alt: 'Cheese Poppers' },
  barista: { src: '/images/barista.webp', alt: 'Barista preparing coffee' },
  seating: { src: '/images/seating.webp', alt: 'Comfortable seating area' },

  heroStill: { src: '/images/hero-still.webp', alt: 'Morning light on marble counter with coffee cup' },
  storyFounder: { src: '/images/story-founder.webp', alt: 'Founder in quiet moment with coffee' },
  craftBean: { src: '/images/craft-bean.webp', alt: 'Premium coffee beans close-up' },
  craftPour: { src: '/images/craft-pour.webp', alt: 'Precise pour-over in progress' },
  craftMoment: { src: '/images/craft-moment.webp', alt: 'Final cup on marble table' },
  sanctuaryMain: { src: '/images/sanctuary-main.webp', alt: 'Main seating area wide shot' },
  sanctuaryDetail: { src: '/images/sanctuary-detail.webp', alt: 'Marble counter and gold fixtures detail' },
  sanctuaryCorner: { src: '/images/sanctuary-corner.webp', alt: 'Private corner seating' },
  sanctuaryWindow: { src: '/images/sanctuary-window.webp', alt: 'Window seat with natural light' },
  teamHead: { src: '/images/team-head.webp', alt: 'Head of Coffee portrait' },
  teamRoaster: { src: '/images/team-roaster.webp', alt: 'Lead Roaster portrait' },
  teamBarista: { src: '/images/team-barista.webp', alt: 'Senior Barista portrait' },
  teamManager: { src: '/images/team-manager.webp', alt: 'Café Manager portrait' },
  invitationBg: { src: '/images/invitation-bg.webp', alt: 'Evening café atmosphere moody lighting' },
};

export const getImage = (slot) => {
  return IMAGES[slot]?.src || placeholder;
};