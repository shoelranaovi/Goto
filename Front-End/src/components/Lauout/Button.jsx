import { Button } from "../ui/button";

function PrimaryButton({ icon, text, onClick }) {
  return (
    <div className="flex justify-center w-full">
      <Button
        onClick={onClick ? onClick : undefined}
        className="rounded-3xl bg-orange-700 flex justify-center items-center 
                   hover:bg-orange-600 text-white gap-2 px-4 py-2 
                   md:px-5 lg:px-6 lg:py-5 cursor-pointer"
      >
        {icon && <span className="flex items-center">{icon}</span>}
        <span className="text-xs md:text-sm lg:text-lg">{text}</span>
      </Button>
    </div>
  );
}

export default PrimaryButton;
