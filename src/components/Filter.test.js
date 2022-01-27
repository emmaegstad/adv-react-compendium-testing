import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../App';

const data = [
  {
    date: '2020-01-04',
    explanation:
      "Like salsa verde on your favorite burrito, a green aurora slathers up the sky in this 2017 June 25 snapshot from the International Space Station. About 400 kilometers (250 miles) above Earth, the orbiting station is itself within the upper realm of the auroral displays. Aurorae have the signature colors of excited molecules and atoms at the low densities found at extreme altitudes. Emission from atomic oxygen dominates this view. The tantalizing glow is green at lower altitudes, but rarer reddish bands extend above the space station's horizon. The orbital scene was captured while passing over a point south and east of Australia, with stars above the horizon at the right belonging to the constellation Canis Major, Orion's big dog. Sirius, alpha star of Canis Major, is the brightest star near the Earth's limb.",
    hdurl: 'https://apod.nasa.gov/apod/image/2001/aurora_iss052e007857.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'Aurora Slathers Up the Sky',
    url: 'https://apod.nasa.gov/apod/image/2001/aurora_iss052e007857_1024.jpg',
  },
  {
    copyright: 'Stefan\nSeip',
    date: '2005-10-05',
    explanation:
      'On Monday, part of the Sun went missing.  The missing piece was no cause for concern -- the Moon was only momentarily in the way.  The event was not a  total eclipse of the Sun for any Earth-bound sky enthusiast but rather, at best, an annular eclipse, where the Moon blocked most of the Sun.  Because of the relatively large distance to the Moon during this Earth-Moon-Sun alignment, the Moon did not have a large enough angular size to block the entire Sun.  Those who witnessed the solar eclipse from a narrow path through Portugal, Spain and Africa, however, were lucky enough to see the coveted Ring of Fire, a dark Moon completely surrounded by the brilliant light of the distant Sun.  Pictured above is a Ring of Fire captured two days ago in unusually high resolution above Spain.  The resulting image shows details of the granular solar surface as well as many prominences around the Sun.',
    hdurl: 'https://apod.nasa.gov/apod/image/0510/annular_seip_big.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'Annular Solar Eclipse at High Resolution',
    url: 'https://apod.nasa.gov/apod/image/0510/annular_seip.jpg',
  },
  {
    date: '1999-11-16',
    explanation:
      "It's not easy to make a map of Antarctica.  Earth's southern most continent is so cold and inhospitable that much of it remains unexplored.  From space, though, it is possible to map this entire region by radar: by systematically noting how long it takes for radio waves to reflect off the terrain.  The Canadian satellite RADARSAT has been orbiting the Earth for the past five years making radar maps, and has recently released the most detailed map of Antarctica ever created.  Above is a computer-generated map of Antarctica at relatively low resolution.  From the RADARSAT map, scientists have been able to better study this mysterious continent, including information about how ancient ice-shelves are crumbling.",
    hdurl: 'https://apod.nasa.gov/apod/image/9911/antarctica_radarsat_big.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'A RADARSAT Map of Antarctica',
    url: 'https://apod.nasa.gov/apod/image/9911/antarctica_radarsat.jpg',
  },
  {
    date: '2014-08-06',
    explanation:
      "Acquiring its first sunlit views of far northern Saturn in late 2012, the Cassini spacecraft's wide-angle camera recorded this stunning, false-color image of the ringed planet's north pole. The composite of near-infrared image data results in red hues for low clouds and green for high ones, giving the Saturnian cloudscape a vivid appearance. Enormous by terrestrial standards, Saturn's north polar hurricane-like storm is deep, red, and about 2,000 kilometers wide. Clouds at its outer edge travel at over 500 kilometers per hour. Other atmospheric vortices also swirl inside the large, yellowish green, six-sided jet stream known as the hexagon. Beyond the cloud tops at the upper right, arcs of the planet's eye-catching rings appear bright blue.",
    hdurl: 'https://apod.nasa.gov/apod/image/1408/PIA14946SaturnNPcassini.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: "Saturn's Swirling Cloudscape",
    url: 'https://apod.nasa.gov/apod/image/1408/PIA14946SaturnNPcassini.jpg',
  },
  {
    date: '1997-05-24',
    explanation:
      "Saturn's rings are actually very thin.  This picture from the Hubble Space Telescope was taken on August 6, 1995 when the rings lined up sideways as seen from Earth.  Saturn's largest moon Titan is seen on the left, and Titan's shadow can be seen on Saturn's cloud tops!  Titan itself looks a brownish color because of its thick atmosphere. Four other moon's of Saturn can be seen just above the ring plane, which are, from left to right: Mimas, Tethys, Janus, and Enceladus. If you look carefully, you will note that the dark band across the planet is actually the shadow of the rings, and is slightly displaced from the real rings - which are best seen away from the planet.  Saturn's rings are not solid - they are composed of ice chunks which range in size from a grain of sand to a house.",
    hdurl: 'https://apod.nasa.gov/apod/image/saturn_24Apr_hst_big.gif',
    media_type: 'image',
    service_version: 'v1',
    title: "Saturn's Rings Seen Sideways",
    url: 'https://apod.nasa.gov/apod/image/saturn_24Apr_hst.gif',
  },
  {
    copyright: 'ISASJAXA',
    date: '2005-11-16',
    explanation:
      "What's that unusual looking spot on asteroid Itokawa? It's the shadow of the  robot spacecraft Hayabusa that took the image.  Japan's Hayabusa mission arrived at the asteroid in early September and has been imaging and maneuvering around the floating space mountain ever since.   The above picture was taken earlier this month.  Asteroid Itokawa spans about 300 meters.  One scientific goal of the Hayabusa mission is to determine out how much ice, rock and trace elements reside on the asteroid's surface, which should give indications about how asteroids and planets formed in the early Solar System.  A can-sized robot MINERVA that was scheduled to hop around the asteroid's surface has not, so far, functioned as hoped.   Later this month, Hayabusa is scheduled to descend to asteroid Itokawa and collect surface samples in a return capsule.  In December, Hayabusa will fire its rockets toward Earth and drop the return capsule down to Earth's Australian outback in 2007 June.",
    hdurl: 'https://apod.nasa.gov/apod/image/0511/itokawa2_hayabusa_big.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: "A Robot's Shadow on Asteroid Itokawa",
    url: 'https://apod.nasa.gov/apod/image/0511/itokawa2_hayabusa.jpg',
  },
  {
    date: '2009-03-02',
    explanation:
      "What is that streaking across the sky? A bright earthgrazing meteor.  In 1972, an unusually bright meteor from space was witnessed bouncing off Earth's atmosphere, much like a skipping stone can bounce off of a calm lake.  The impressive event lasted several seconds, was visible in daylight, and reportedly visible all the way from Utah, USA to Alberta, Canada.  Pictured above, the fireball was photographed streaking above Teton mountains behind Jackson Lake, Wyoming, USA.  The Great Daylight Fireball of 1972 was possibly the size of a small truck, and would likely have created an impressive airburst were it to have struck Earth more directly.   Earthgrazing meteors are rare but are more commonly seen when the radiant of a meteor shower is just rising or setting.  At that time, meteors closer to the Earth than earthgrazers would more usually strike the Earth near the horizon, while meteors further than earthgrazers would miss the Earth entirely.   digg_url = 'http://apod.nasa.gov/apod/ap090302.html'; digg_skin = 'compact';",
    hdurl: 'https://apod.nasa.gov/apod/image/0903/earthgrazer_ansmet.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'Earthgrazer: The Great Daylight Fireball of 1972',
    url: 'https://apod.nasa.gov/apod/image/0903/earthgrazer_ansmet_big.jpg',
  },
  {
    date: '1996-10-15',
    explanation:
      "Hurtling through space a mere 3,000 miles above the Martian surface, the diminutive moon Phobos (below and left of center) was imaged against the backdrop of a large shield volcano by the Viking 2 Orbiter in 1977. This dramatic picture looks down from the Orbiter's viewpoint about 8,000 miles above the volcano, Ascraeus Mons. Phobos itself is 5,000 miles below the Orbiter. North is toward the top with the Sun illuminating the scene from the South (black dots are reference marks). For scale, Ascraeus Mons is about 200 miles across at its base while asteroid sized Phobos is about 15 miles in diameter. In this spectacular moon-planet image, volcanic calderas (craters) are visible at the summit of Ascraeus Mons -- while impact craters on the sunlit side of Phobos' surface can also be seen!",
    hdurl: 'https://apod.nasa.gov/apod/image/phobosmars_viking2_big.gif',
    media_type: 'image',
    service_version: 'v1',
    title: 'Phobos Over Mars',
    url: 'https://apod.nasa.gov/apod/image/phobosmars_viking2.gif',
  },
  {
    date: '2019-03-19',
    explanation:
      "What are those strange arcs? While imaging the cluster of galaxies Abell 370, astronomers noticed an unusual arc.  The arc wasn't understood right away -- not until better images showed that the arc was a previously unseen type of astrophysical artifact of a gravitational lens, where the lens was the center of an entire cluster of galaxies. Today, we know that this arc, the brightest arc in the cluster, actually consists of two distorted images of a fairly normal galaxy that happens to lie far in the distance.  Abell 370's gravity caused the background galaxies' light -- and others -- to spread out and come to the observer along multiple paths, not unlike a distant light appears through the stem of a wine glass. Almost all of the yellow images featured here are galaxies in the Abell 370 cluster. An astute eye can pick up many strange arcs and distorted arclets, however, that are actually gravitationally lensed images of distant normal galaxies. Studying Abell 370 and its images gives astronomers a unique window into the distribution of normal and dark matter in galaxy clusters and the universe.",
    hdurl: 'https://apod.nasa.gov/apod/image/1903/Abell370Arcs_HubbleAndreo_1840.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'Abell 370: Galaxy Cluster Gravitational Lens',
    url: 'https://apod.nasa.gov/apod/image/1903/Abell370Arcs_HubbleAndreo_960.jpg',
  },
  {
    date: '2010-05-10',
    explanation:
      'Sometimes part of the Sun can just explode into space. These explosions might occur as powerful solar flares, coronal mass ejections, or comparatively tame eruptive solar prominences.  Pictured above is one of the largest solar prominence eruptions yet observed, one associated with a subsequent coronal mass ejection. The prominence erupted last month and was recorded by several Sun-sensing instruments, including the recently launched Solar Dynamics Observatory (SDO). The above time lapse sequence was captured by SDO and occurred over a few hours. In recent months, our Sun has becoming increasingly active, following a few years of an unusually dormant solar minimum.  Over the next few years our Sun is expected to reach solar maximum and exhibit a dramatic increase in sunspots and all types of solar explosions.',
    media_type: 'other',
    service_version: 'v1',
    title: 'Large Eruptive Prominence Movie from SDO',
  },
  {
    date: '2011-01-20',
    explanation:
      "The big, beautiful Andromeda Galaxy, aka M31, is a spiral galaxy a mere 2.5 million light-years away. Two space-based observatories have combined to produce this intriguing composite image of Andromeda, at wavelengths outside the visible spectrum. The remarkable view follows the locations of this galaxy's once and future stars. In reddish hues, image data from the large Herschel infrared observatory traces enormous lanes of dust, warmed by stars, sweeping along Andromeda's spiral arms. The dust, in conjunction with the galaxy's interstellar gas, comprises the raw material for future star formation. X-ray data from the XMM-Newton observatory in blue pinpoint Andromeda's X-ray binary star systems. These systems likely contain neutron stars or stellar mass black holes that represent final stages in stellar evolution. More than twice the size of our own Milky Way, the Andromeda Galaxy is over 200,000 light-years across.",
    hdurl: 'https://apod.nasa.gov/apod/image/1101/M31_XMM_HERSCHEL.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'The Once and Future Stars of Andromeda',
    url: 'https://apod.nasa.gov/apod/image/1101/M31_XMM_HERSCHEL_r900.jpg',
  },
  {
    date: '2021-01-20',
    explanation:
      "Do magnetic fields always flow along spiral arms?  Our face-on view of the Whirlpool Galaxy (M51) allows a spectacularly clear view of the spiral wave pattern in a disk-shaped galaxy.  When observed with a radio telescope, the magnetic field appears to trace the arms' curvature.  However, with NASA’s flying Stratospheric Observatory for Infrared Astronomy (SOFIA) observatory, the magnetic field at the outer edge of M51's disk appears to weave across the arms instead.  Magnetic fields are inferred by grains of dust aligning in one direction and acting like polaroid glasses on infrared light.  In the featured image, the field orientations determined from this polarized light are algorithmically connected, creating streamlines.  Possibly the gravitational tug of the companion galaxy, at the top of the frame, on the dusty gas of the reddish star-forming regions, visible in the Hubble Space Telescope image, enhances turbulence -- stirring the dust and lines to produce the unexpected field pattern of the outer arms.",
    hdurl: 'https://apod.nasa.gov/apod/image/2101/M51Bfield_Sofia_2286.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'The Magnetic Field of the Whirlpool Galaxy',
    url: 'https://apod.nasa.gov/apod/image/2101/M51Bfield_Sofia_960.jpg',
  },
  {
    date: '1996-06-24',
    explanation:
      'Color information from the Soviet Venera landers and radar data from the Magellan spacecraft were used to construct this striking perspective view of the Venusian landscape. (In this computer generated image, the vertical scale has been exagerated.) In the foreground is the edge of a rift valley created by faulting in the crust of Venus. The valley runs all the way to the base of Gula Mons, a 2 mile high volcano seen here on the right, some 450 miles in the distance. On the left is another volcano, Sif Mons. Using radar to pierce the dense clouds continuously shrouding the Face of Venus, Magellan was able to explore over 98% of the Venusian surface, revealing a a diverse and tantalizing topography.',
    hdurl: 'https://apod.nasa.gov/apod/image/gularif1_magellan_big.gif',
    media_type: 'image',
    service_version: 'v1',
    title: 'A View from Venus: Rift Valley',
    url: 'https://apod.nasa.gov/apod/image/gularif1_magellan.gif',
  },
  {
    date: '2000-09-18',
    explanation:
      'Last Monday the crew of Space Shuttle Atlantis took in this view as they approached the developing International Space Station (ISS).   From top to bottom, the astronauts saw a station currently consisting of the Progress supply module, the Zvezda service module, the Zarya cargo module, and the Unity connecting module.  Never before had astronauts seen the station since the remote-controlled additions of Progress and Zvezda.  Energy collecting flat solar panels can be seen extending from some of the modules.  Soon after this picture was taken, Atlantis docked with the ISS at the Unity end.  The astronauts have worked hard unloading supplies, installing and testing equipment, and even planning to reboost the floating space station to a higher orbit.  The Shuttle and its entire crew are scheduled to return to Earth Wednesday.   The Space Shuttle Discovery is then scheduled to visit the ISS in two weeks.',
    hdurl: 'https://apod.nasa.gov/apod/image/0009/iss_sts106_big.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'Approaching the International Space Station',
    url: 'https://apod.nasa.gov/apod/image/0009/iss_sts106.jpg',
  },
  {
    date: '2015-06-19',
    explanation:
      "Hitching a ride to low Earth orbit, LightSail A accomplished a challenging test mission, unfurling its 32 square meter mylar solar sail on June 7. This dramatic image from one of the bread loaf sized spacecraft's fisheye cameras captures the deployed sail glinting in sunlight. Sail out and visible to Earthbound observers before its final orbit, LightSail A reentered the atmosphere last weekend. Its succesful technology demonstration paves the way for the LightSail B spacecraft, scheduled for launch in April 2016. Once considered the stuff of science fiction, sailing through space was suggested 400 years ago by astronomer Johannes Kepler who observed comet tails blown by the solar wind. But modern solar sail designs, like the one tested by LightSail A, rely on the small but continuous pressure from sunlight itself for thrust.",
    hdurl: 'https://apod.nasa.gov/apod/image/1506/P02_1600x1200_30-1_T0_47_33_D20_0_70.out.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'LightSail A',
    url: 'https://apod.nasa.gov/apod/image/1506/PlanetarySocSail_1024.jpg',
  },
  {
    date: '2006-05-16',
    explanation:
      'The International Space Station (ISS) is the largest human-made object ever to orbit the Earth.   Last August, the station was visited and resupplied by space shuttle Discovery.   The ISS is currently operated by the Expedition 13 crew, consisting a Russian and an American astronaut.   After departing the ISS, the crew of Discovery captured this spectacular vista of the orbiting space city high above the Caspian Sea.   Visible components include modules, trusses, and expansive solar arrays that gather sunlight that is turned into needed electricity.',
    hdurl: 'https://apod.nasa.gov/apod/image/0605/iss2_sts114_big.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'The International Space Station from Above',
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

test('Select should click ascending and descending', async () => {
  render(<App />);
  await waitForElementToBeRemoved(await screen.findByText('Loading...'), { timeout: 5000 });

  const controls = await screen.findByRole('combobox');
  userEvent.selectOptions(controls, [screen.getByText('Ascending')]);
  expect(screen.getByRole('option', { name: 'Ascending' }).selected).toBe(true);
});
