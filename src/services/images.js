export async function imageAsc() {
  const resp = await fetch(
    'https://api.nasa.gov/planetary/apod?api_key=GgMbnOF5vkt6NU3YVJIwx0QIp96h3hUZymmEk34y&count=25'
  );
  const data = await resp.json();
  console.log('DATA', data);
  const sorted = data.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  return sorted;
}

export async function imageDesc() {
  const resp = await fetch(
    'https://api.nasa.gov/planetary/apod?api_key=YunY96dmRe6pkaOAen1SKJJPUFEd2a7TbMPGntRj&count=25'
  );
  const data = await resp.json();
  console.log('DATA', data);
  const sorted = data.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  return sorted;
}
