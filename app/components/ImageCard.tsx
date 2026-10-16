interface ImageCardProps {
  id?: string;
  imageUrl?: string;
  imageName?: string;
  imageSize?: string;
  uploadDate?: string;
  extension?: string;
  onDelete?: (id: string) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  id,
  imageName,
  imageUrl,
  imageSize,
  uploadDate,
  extension,
  onDelete
}) => {
  function downloadImage() {
    if (imageUrl) {
      window.open(imageUrl, '_blank');
    }
  }

  return (
    <div className="card relative bg-gray-800 border border-gray-700 rounded-md shadow-md transition-all ease-in-out duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between">
      <div>
        <img 
          onClick={downloadImage} 
          src={imageUrl} 
          className="h-56 w-full object-cover rounded-t-md cursor-pointer" 
          alt={imageName} 
        />
        <div className="card-body p-4">
          <h1 className="text-xl font-semibold mb-2 text-white">{imageName}</h1>
          <p className="text-sm text-gray-300">{formatBytes(Number(imageSize))}</p>
          <p className="text-sm text-gray-300">{uploadDate}</p>
          <p className="text-sm text-gray-300 mb-2">{extension}</p>
        </div>
      </div>
    </div>
  );
};

function formatBytes(bytes: number = 0, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const absBytes = Math.abs(bytes);

  
    const i = Math.min(
        Math.floor(Math.log(absBytes) / Math.log(k)),
        sizes.length - 1
    );

    const formattedValue = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedValue} ${sizes[i]}`;
}

// Exemplos de uso:
console.log(formatBytes(1024));       // "1 KB"
console.log(formatBytes(1234567, 3)); // "1.177 MB"
console.log(formatBytes(1099511627776)); // "1 TB"

