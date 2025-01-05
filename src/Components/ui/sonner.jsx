import { Toaster as Sonner } from "sonner"
import { selectThemeProperties } from "@/slices/theme"
import { useSelector } from "react-redux"

const Toaster = ({
  ...props
}) => {
  const themeProperties = useSelector(selectThemeProperties)
 

  return (
    (<Sonner
      className="toaster group"
      toastOptions={{
        style: {
          background: themeProperties?.toastColor ,
          color: themeProperties?.toastTextColor,
        },
      }}

      {...props} />)
  );
}

export { Toaster }
