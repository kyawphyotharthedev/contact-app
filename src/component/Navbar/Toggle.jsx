import React from "react";
import { useState } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { Switch, Group, useMantineTheme } from "@mantine/core";
import { HiLightBulb } from "react-icons/hi";
import { useContextCustom } from "../../context/DarkContext";
const Toggle = () => {
  const theme = useMantineTheme();
  const [checked, setChecked] = useState(false);
  const { lightSwitch } = useContextCustom();
  const changeHandle = (e) => {
    lightSwitch();
    setChecked(e.currentTarget.checked);
  };
  return (
    <div>
      <Group position="center">
        <Switch
        className=" duration-[1s]"
          checked={checked}
          onChange={changeHandle}
          color="teal"
          size="lg"
          thumbIcon={
            checked ? (
              <HiLightBulb
                size="0.8rem"
                color={theme.colors.teal[theme.fn.primaryShade()]}
                stroke={3}
              />
            ) : (
              <BsFillMoonStarsFill
                size="0.8rem"
                color={theme.colors.red[theme.fn.primaryShade()]}
                stroke={3}
              />
            )
          }
        />
      </Group>
    </div>
  );
};

export default Toggle;
