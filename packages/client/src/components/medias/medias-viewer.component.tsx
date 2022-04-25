export function MediasViewer({medias}: {medias: string[]}) {
  return (
    <div className={"border-2 border-gray-700 p-2 rounded-lg mt-3 overflow-auto"}>
      <div className={"flex"}>
        {medias.map((file) => (
          <a
            href={file}
            target={"_blank"}
            className="mr-1 border-1 border-gray-700 block opacity-90 hover:opacity-100 overflow-hidden rounded-lg"
          >
            <img src={file} key={file} alt={file} style={{width: "80px"}} />
          </a>
        ))}
      </div>
    </div>
  );
}
