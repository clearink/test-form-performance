export default function SimpleInput(props: any) {
  return (
    <input
      {...props}
      value={props.value ?? ""}
      style={{ width: "100%", height: 32 }}
    />
  );
}
