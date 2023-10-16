export default function randomID(preset: string) {
  return preset + Math.floor(Math.random() * 10000000);
}
