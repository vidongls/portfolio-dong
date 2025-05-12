export default function Home() {
  const onClick = () => {
    console.log("test");
  };

  return <div onClick={onClick}>test</div>;
}
