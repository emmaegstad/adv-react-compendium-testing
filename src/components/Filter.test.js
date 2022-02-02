import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../App';

const data = [
  {
    date: '2006-05-16',
    explanation:
      'The International Space Station (ISS) is the largest human-made object ever to orbit the Earth.   Last August, the station was visited and resupplied by space shuttle Discovery.   The ISS is currently operated by the Expedition 13 crew, consisting a Russian and an American astronaut.   After departing the ISS, the crew of Discovery captured this spectacular vista of the orbiting space city high above the Caspian Sea.   Visible components include modules, trusses, and expansive solar arrays that gather sunlight that is turned into needed electricity.',
    hdurl: 'https://apod.nasa.gov/apod/image/0605/iss2_sts114_big.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'MOCK The International Space Station from Above',
    url: 'https://apod.nasa.gov/apod/image/0605/iss2_sts114.jpg',
  },
  {
    date: '1998-01-05',
    explanation:
      "What on Earth is that? The Richat Structure in the Sahara Desert of Mauritania is easily visible from space because it is nearly 50 kilometers across.  Once thought to be an impact crater, the Richat Structure's flat middle and lack of shock-altered rock indicates otherwise. The possibility that the Richat Structure was formed by a volcanic eruption also seems improbable because of the lack of a dome of igneous or volcanic rock.  Rather, the layered sedimentary rock of the Richat structure is now thought by many to have been caused by uplifted rock sculpted by erosion.  Why the Richat Structure is nearly circular remains a mystery.",
    hdurl: 'https://apod.nasa.gov/apod/image/9801/richat_sts41g_big.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: "Earth's Richat Structure",
    url: 'https://apod.nasa.gov/apod/image/9801/richat_sts41g.jpg',
  },
  {
    date: '2000-01-12',
    explanation:
      "NGC 6791 is one of the oldest and largest open clusters of stars known.  But how did it get so dirty?  Open star clusters usually contain a few hundred stars each less than a billion years old.  Open star cluster NGC 6791, however, contains thousands of stars recently measured to be about 8 billion years old.  What's really confusing, though, is that the stars of NGC 6791 are relatively dirty - the minuscule amounts of heavy elements (generically called metals) are high relative to most other star clusters.  Older stars are supposed to be metal poor, since metals have only been slowly accumulating in our Milky Way Galaxy.  This enigma makes NGC 6791, pictured above, one of the most studied open clusters and a possible example of how stars might evolve in the centers of galaxies.",
    hdurl: 'https://apod.nasa.gov/apod/image/0001/ngc6791_kpno_big.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'NGC 6791: An Old, Large Open Cluster',
    url: 'https://apod.nasa.gov/apod/image/0001/ngc6791_kpno.jpg',
  },
  {
    copyright: 'Martin Pugh',
    date: '2018-10-31',
    explanation:
      "Better known as Hind's Crimson Star, R Leporis is a rare star in planet Earth's night sky. It's also a shocking shade of red. The star's discoverer, 19th century English astronomer John Russell Hind, reported that it appeared in a telescope \"... like a drop of blood on a black field.\" Located 1,360 light-years away in the constellation Lepus the star is a Mira-type variable, changing its brightness over a period of about 14 months. R Leporis is now recognized as a carbon star, a very cool and highly evolved red giant with an extreme abundance of carbon. Extra carbon in carbon stars is created by helium fusion near the dying stellar core and dredged up into the stars' outer layers. The dredge-up results in an overabundance of simple carbon molecules, like CO, CH, CN, and C2. While it's true that cool stars radiate most of their energy in red and infrared light, the carbon molecules strongly absorb what little blue light is left and give carbon stars an exceptionally deep red color.  R Leporis is losing its carbon-rich atmosphere into the surrounding interstellar material through a strong stellar wind though, and could be near the transition to a planetary nebula. Oh, and Happy Halloween from the folks at APOD.",
    hdurl: 'https://apod.nasa.gov/apod/image/1811/RLeporisMP.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: "R Leporis: A Vampire's Star",
    url: 'https://apod.nasa.gov/apod/image/1811/RLeporisMP1024.jpg',
  },
  {
    copyright: 'Martin Pugh',
    date: '2012-06-01',
    explanation:
      "These three bright nebulae are often featured in telescopic tours of the constellation Sagittarius and the crowded starfields of the central Milky Way. In fact, 18th century cosmic tourist Charles Messier cataloged two of them; M8, the large nebula left of center, and colorful M20 on the right. The third, NGC 6559, is above M8, separated from the larger nebula by a dark dust lane. All three are stellar nurseries about five thousand light-years or so distant. The expansive M8, over a hundred light-years across, is also known as the Lagoon Nebula. M20's popular moniker is the Trifid. Glowing hydrogen gas creates the dominant red color of the emission nebulae, with contrasting blue hues, most striking in the Trifid, due to dust reflected starlight. This broad skyscape also includes one of Messier's open star clusters, M21, just above and right of the Trifid.",
    hdurl: 'https://apod.nasa.gov/apod/image/1206/sag3_pugh.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'A Sagittarius Triplet',
    url: 'https://apod.nasa.gov/apod/image/1206/sag3_pugh_930.jpg',
  },
  {
    copyright: 'Nuits sacrees',
    date: '2017-08-30',
    explanation:
      'What was happening in the sky during last week\'s total solar eclipse?  This featured little-planet, all-sky, double time-lapse, digitally-fused composite captured celestial action during both night and day from a single location. In this 360x180 panorama, north and south are at the image bottom and top, while east and west are at the left and right edges, respectively.  During four hours the night before the eclipse, star trails were captured circling the north celestial pole (bottom) as the Earth spun.  During the day of the total eclipse, the Sun was captured every fifteen minutes from sunrise to sunset (top), sometimes in partial eclipse. All of these images were then digitally merged onto a single image taken exactly during the total solar eclipse.  Then, the Sun\'s bright corona could be seen flaring around the dark new Moon (upper left), while Venus simultaneously became easily visible (top).  The tree in the middle, below the camera, is a Douglas fir. The images were taken with care and planning at  Magone Lake in Oregon, USA.   Total Eclipse 2017: More memorable images -- please "Like" your favorites.',
    hdurl: 'https://apod.nasa.gov/apod/image/1708/EclipsePrince_Vetter_1500.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'Panoramic Eclipse Composite with Star Trails',
    url: 'https://apod.nasa.gov/apod/image/1708/EclipsePrince_Vetter_1000.jpg',
  },
  {
    date: '2013-02-13',
    explanation:
      'The Great Nebula in Orion is a intriguing place.  Visible to the unaided eye, it appears as a small fuzzy patch in the constellation of Orion. But this image, an illusory-color composite of four colors of infrared light taken with the Earth orbiting WISE observatory, shows the Orion Nebula to be a bustling neighborhood or recently formed stars, hot gas, and dark dust.  The power behind much of the Orion Nebula (M42) is the stars of the Trapezium star cluster, seen near the center of the above wide field image. The eerie green glow surrounding the bright stars pictured here is their own starlight reflected by intricate dust filaments that cover much of the region.  The current  Orion Nebula cloud complex, which includes the Horsehead Nebula, will slowly disperse over the next 100,000 years.',
    hdurl: 'https://apod.nasa.gov/apod/image/1302/orion_wise_5401.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'Infrared Orion from WISE',
    url: 'https://apod.nasa.gov/apod/image/1302/orion_wise_960.jpg',
  },
  {
    date: '2000-09-23',
    explanation:
      "Yesterday the Sun crossed the celestial equator heading south, marking the Equinox -- the first day of Autumn in the northern hemisphere and Spring in the south. Equinox means equal night and with the Sun on the celestial equator, Earthlings will experience 12 hours of daylight and 12 hours of darkness. For those in the northern hemisphere, the days will continue to grow shorter with the Sun marching lower in the sky as winter approaches. A few weeks after the Autumnal Equinox of 1994, the Crew of the Shuttle Endeavor recorded this image of the Sun poised above the Earth's limb. Glare illuminates Endeavor's vertical tail (pointing toward the Earth) along with radar equipment in the payload bay.",
    hdurl: 'https://apod.nasa.gov/apod/image/0009/sun_sts68_big.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'The Equal Night',
    url: 'https://apod.nasa.gov/apod/image/0009/sun_sts68.jpg',
  },
  {
    date: '1998-11-02',
    explanation:
      'In this tangle of quasars and galaxies lies a clue to the expansion rate of the universe.  A diffuse glow evident in the picture on the left reveals a normal elliptical galaxy.  Directly behind this galaxy lies a normal quasar. Because the quasar is directly behind the galaxy, however, the gravity of the galaxy deflects quasar light like a lens, creating four bright images of the same distant quasar.  When these images are all digitally subtracted, a distorted image of the background galaxy that hosts the quasar appears - here shown on the right in ghostly white. Each quasar image traces how the quasar looked at different times in the past, with the time between images influenced by the expansion rate of the universe itself.  Assuming dark matter in the elliptical lens galaxy traces the visible matter, this expansion rate can be characterized by a Hubble constant of Ho near 65 km/sec/Mpc, a value close to that determined by other methods.  Analysis of this image by itself sheds little light on whether the global geometry of the universe is affected by a cosmological constant.',
    hdurl: 'https://apod.nasa.gov/apod/image/9811/pg1115_hst_big.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'PG 1115+080 A Ghost of Lensing Past',
    url: 'https://apod.nasa.gov/apod/image/9811/pg1115_hst.jpg',
  },
  {
    date: '2012-12-30',
    explanation:
      "Carinae may be about to explode.  But no one knows when - it may be next year, it may be one million years from now. Eta Carinae's mass - about 100 times greater than our Sun - makes it an excellent candidate for a full blown supernova. Historical records do show that about 150 years ago Eta Carinae underwent an unusual outburst that made it one of the brightest stars in the southern sky.  Eta Carinae, in the Keyhole Nebula, is the only star currently thought to emit natural LASER light. This image, taken in 1996, brought out new details in the unusual nebula that surrounds this rogue star.  Now clearly visible are two distinct lobes, a hot central region, and strange radial streaks.  The lobes are filled with lanes of gas and dust which absorb the blue and ultraviolet light emitted near the center.  The streaks remain unexplained.   APOD Editors to Speak: RJN in Philadelphia on Jan. 3 & JTB in New York City on Jan. 4",
    hdurl: 'https://apod.nasa.gov/apod/image/1212/etacarinae_hst_900.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'Doomed Star Eta Carinae',
    url: 'https://apod.nasa.gov/apod/image/1212/etacarinae_hst_960.jpg',
  },
];

const server = setupServer(
  rest.get(
    'https://api.nasa.gov/planetary/apod?api_key=YunY96dmRe6pkaOAen1SKJJPUFEd2a7TbMPGntRj&count=25',
    (req, res, ctx) => {
      return res(ctx.json([data]));
    }
  )
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

test.only('Select should click ascending and descending', async () => {
  render(<App />);
  await waitForElementToBeRemoved(await screen.findByText('Loading...'), { timeout: 5000 });

  const controls = await screen.findByRole('combobox');
  userEvent.selectOptions(controls, [screen.getByText('Ascending')]);
  expect(screen.getByRole('option', { name: 'Ascending' }).selected).toBe(true);
});
