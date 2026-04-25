import Image from "next/image";
interface StatTileProps {
    stat: number;
    label: string;
    icon: string;
  }
  
  const StatTile = ({ stat, label, icon }: StatTileProps) => {
    return (
      <div className="border w-full flex flex-row items-center p-4 space-x-6">
        <Image src={icon} alt={label} width={40} height={40} />
        <div className="w-full flex flex-col">
          <h2 className="text-primary text-4xl">{stat ? stat : 0}</h2>
          <p>{label}</p>
        </div>
      </div>
    );
};

export default StatTile;