

type IconType1 = "application" | "settings" | "user" | "trash" | string; // adding string here removes the autocomplete while using this type
//    ^?
type IconType = "application" | "settings" | "user" | "trash" | (string&{}); // adding (string&{}) adds the autocomplete while using this type
//    ^?

type IconTyp2 = "application" | "settings" | "user" | "trash" | (string | number);
//    ^?

type IconProps = {
  icon: IconType;
};

const Icon = (props: IconProps) => {
  return null;
};

<>
<Icon icon="settings"/>
</>