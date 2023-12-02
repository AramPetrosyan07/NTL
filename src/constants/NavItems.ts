
export interface NavItemsProps {
  id:number,
  title:string,
  to:string,
  fullPath:string
}

export const customerNavItems:NavItemsProps[] = [
    {
      id: 1,
      title: "Գլխավոր",
      to: "/admin",
      fullPath: "/admin",
    },
    {
      id: 2,
      title: "Ավելացնել բեռներ",
      to: "/admin/additems",
      fullPath: "/admin/additems",
    },
    {
      id: 3,
      title: "Փոփոխել բեռները",
      to: "/admin/changeitems",
      fullPath:"/admin/changeitems"
    },
    {
      id: 4,
      title: "Կարգավորումներ",
      to: "/admin/settings",
      fullPath:"/admin/settings",
    },
  ];

  export const carrierNavItems:NavItemsProps[] = [
    {
      id: 1,
      title: "Գլխավոր",
      to: "/admin",
      fullPath: "/admin",
    },
    {
      id: 2,
      title: "Ավելացնել բեռնատարներ",
      to: "/admin/additems",
      fullPath: "/admin/additems",
    },
    {
      id: 3,
      title: "Փոփոխել բեռնատարները",
      to: "/admin/changeitems",
      fullPath: "/admin/changeitems"
    },
    {
      id: 4,
      title: "Կարգավորումներ",
      to: "/admin/settings",
      fullPath:"/admin/settings"
    },
  ];

  