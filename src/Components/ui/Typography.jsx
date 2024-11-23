// Typography.js
const Typography = ({ variant = "body1", children, className }) => {
     const typographyStyles = {
       h1: "text-4xl font-semibold",
       h2: "text-3xl font-semibold",
       h3: "text-2xl font-semibold",
       h6: "text-lg font-medium",
       body1: "text-base",
     };
   
     return <p className={`${typographyStyles[variant]} ${className}`}>{children}</p>;
   };
   
   export default Typography;
   