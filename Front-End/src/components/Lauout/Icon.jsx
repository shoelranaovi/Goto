function Icon({ icon, size = "w-10 h-10", bg = "bg-transparent", hover = "hover:bg-gray-200", rounded = "rounded-full", color = "text-gray-700", onClick }) {
    return (
      <div
        onClick={onClick}
        className={`flex items-center justify-center  ${size} ${bg} ${hover} ${rounded} ${color} cursor-pointer transition duration-200`}
      >
        {icon}
      </div>
    );
  }
  
  export default Icon;
  