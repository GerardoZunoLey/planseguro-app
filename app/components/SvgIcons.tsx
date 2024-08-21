import React from "react"
import { SvgProps } from "react-native-svg"
import On1 from "../../assets/icons/on1.svg"
import On2 from "../../assets/icons/on2.svg"
import On3 from "../../assets/icons/on3.svg"
import On4 from "../../assets/icons/on4.svg"
import LoginBack from "../../assets/images/login_back.svg"

interface Props {
  name: string
  width: number | string
  height: number | string
}

const SvgIcons: React.FC<Props> = ({ name, width, height }) => {
  const SvgIconsMap: { [key: string]: React.FC<SvgProps> } = {
    onBoarding1: On1,
    onBoarding2: On2,
    onBoarding3: On3,
    onBoarding4: On4,
    loginImg: LoginBack,
  }

  const Icon = SvgIconsMap[name]

  if (!Icon) {
    return null
  }

  return <Icon width={width} height={height} />
}

export default SvgIcons
