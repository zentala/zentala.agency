import React from 'react';
import { Link } from 'gatsby-plugin-intl'

interface LogoProps {
  type?: 'full' | 'sygnet',
  alt?: string;
  link?: string;
  color?: string;
  height?: number | string;
  width?: number | string;
  supplement?: string;
  uppercase?: boolean;
  containerStyle?: React.CSSProperties;
  supplementPosition?: 'top' | 'bottom' | 'right';
  suplementStyle?: React.CSSProperties;
}

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

type FlexStyles = {
  flexDirection: FlexDirection;
  alignItems: AlignItems;
  justifyContent?: JustifyContent;
}

const Logo: React.FC<LogoProps> = ({ 
  type = 'full', 
  alt, 
  link, 
  color = 'inherit', 
  width, 
  height, 
  supplement, 
  uppercase = false,
  containerStyle,
  supplementPosition = 'right',
  suplementStyle
}) => {
  
  // width = !height ? width : 'auto';

  const getContainerStyles = (position: string): FlexStyles  => {
    switch (position) {
      case 'top':
        return {
          flexDirection: 'column-reverse',
          alignItems: 'center',
        };
      case 'bottom':
        return {
          flexDirection: 'column',
          alignItems: 'center',
        };
      case 'right':
      default:
        return {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        };
    }
  };

  const styles: Record<string, React.CSSProperties> = {
    container: {
      display: 'flex',
      whiteSpace: 'nowrap',
      ...getContainerStyles(supplementPosition),
      ...containerStyle 
    },
    containerSygnet: {
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      ...containerStyle 
    },
    svg: {
      height: height || 'auto',
      width: width || (height ? 'auto' : '100%'),
    },
    supplement: {
      marginLeft: '1em', 
      fontSize: '1em', 
      textTransform: uppercase ? 'uppercase' : 'none', 
      // paddingTop: '0.4em',
      color,
      ...suplementStyle
    }
  };

  if (supplementPosition === 'right') {
    styles.supplement.marginLeft = '1em';
  } else {
    // styles.supplement.marginTop = '0.4em';
  }

  const LogoFullSVG = (
    <div style={styles.container}>
      <svg 
        version="1.0" xmlns="http://www.w3.org/2000/svg" 
        width="806.000000pt" height="111.000000pt" 
        viewBox="0 0 806.000000 111.000000" 
        preserveAspectRatio="xMidYMid meet"
        style={styles.svg}>
        <title>{alt}</title>
        <g transform="translate(0.000000,111.000000) scale(0.100000,-0.100000)" stroke="none" fill={color}>
          <path d="M44 1037 l-42 -72 234 -5 233 -5 -103 -145 -102 -145 -107 -5 -107 -5 -20 -33 c-11 -18 -20 -35 -20 -37 0 -3 78 -5 174 -5 l175 0 144 206 145 205 -26 60 -25 59 -256 0 -256 0 -41 -73z"/>
          <path d="M1430 880 l0 -70 295 0 295 0 0 70 0 70 -295 0 -295 0 0 -70z"/>
          <path d="M2582 558 l3 -393 72 -3 73 -3 2 267 3 267 205 -264 206 -264 47 -3 47 -3 0 395 0 396 -75 0 -75 0 -2 -240 -3 -240 -189 240 -189 240 -63 0 -64 0 2 -392z"/>
          <path d="M3750 885 l0 -65 125 0 125 0 0 -330 0 -330 75 0 75 0 0 330 0 330 125 0 125 0 0 65 0 65 -325 0 -325 0 0 -65z"/>
          <path d="M5172 933 c-9 -16 -147 -321 -293 -647 -27 -59 -49 -112 -49 -118 0 -5 34 -8 78 -6 l77 3 134 303 c74 166 137 302 141 302 3 0 65 -136 138 -302 l131 -303 80 -3 c45 -2 81 1 80 5 0 4 -78 181 -173 393 l-172 385 -81 3 c-70 2 -83 0 -91 -15z"/>
          <path d="M6190 555 l0 -395 280 0 280 0 0 70 0 70 -205 0 -206 0 3 102 3 102 120 46 120 46 3 57 c2 31 -1 57 -5 57 -4 0 -60 -20 -123 -44 l-115 -44 -3 164 -2 164 -75 0 -75 0 0 -395z"/>
          <path d="M7526 918 c-7 -18 -86 -194 -175 -391 -88 -197 -161 -360 -161 -362 0 -3 35 -5 79 -5 l78 0 133 303 c73 166 136 305 140 310 3 4 66 -132 140 -303 l134 -310 78 0 c43 0 78 3 78 8 0 4 -77 181 -172 395 l-173 387 -82 0 -83 0 -14 -32z"/>
          <path d="M588 833 c-42 -59 -99 -141 -127 -180 l-52 -73 79 0 78 0 81 117 81 116 -24 56 c-14 31 -29 60 -33 64 -4 4 -42 -41 -83 -100z"/>    <path d="M1430 555 l0 -65 295 0 295 0 0 65 0 65 -295 0 -295 0 0 -65z"/>
          <path d="M86 421 c-42 -60 -76 -116 -76 -124 0 -8 12 -40 26 -71 l26 -57 17 23 c42 55 231 326 231 332 0 3 -33 6 -74 6 l-73 0 -77 -109z"/>
          <path d="M358 513 c-45 -54 -272 -388 -270 -397 2 -6 13 -32 24 -58 l20 -48 258 0 258 0 41 70 40 70 -230 0 c-153 0 -229 3 -229 11 0 5 44 73 98 149 l97 139 107 1 108 0 20 40 20 40 -173 0 c-153 0 -176 -2 -189 -17z"/>
          <path d="M1430 235 l0 -75 293 2 292 3 3 73 3 72 -296 0 -295 0 0 -75z"/>
        </g>
      </svg>
      
      <div style={styles.supplement}>
        {supplement}
      </div>
      
    </div>
  );

  const LogoSygnetSVG = (
    <div style={styles.containerSygnet}>
      <svg 
        version="1.0" xmlns="http://www.w3.org/2000/svg" 
        width="294.000000pt" height="440.000000pt" 
        viewBox="0 0 294.000000 440.000000"
        preserveAspectRatio="xMidYMid meet"
        style={{ height: height || 'auto', width: width || '100%' }}>
        <title>{alt}</title>
        <g transform="translate(0.000000,440.000000) scale(0.100000,-0.100000)" fill={color} stroke="none">
          <path d="M239 4223 c-56 -98 -133 -230 -170 -293 l-68 -115 945 -5 945 -5 -32 -45 c-55 -75 -709 -1000 -763 -1077 l-50 -73 -417 0 -416 0 -74 -127 c-40 -71 -81 -143 -92 -160 l-19 -33 709 0 710 0 69 98 c38 53 166 234 284 402 119 168 258 366 310 440 52 74 184 261 294 415 109 154 199 285 199 291 0 5 -36 91 -81 190 -44 98 -90 200 -101 227 l-20 47 -1030 0 -1029 0 -103 -177z"/>
          <path d="M2668 3743 c-8 -10 -109 -151 -224 -313 -213 -303 -384 -545 -640 -906 -80 -113 -148 -212 -151 -220 -4 -12 43 -14 306 -14 l311 0 38 52 c20 29 168 238 328 466 l291 414 -113 254 c-140 313 -126 289 -146 267z"/>
          <path d="M350 1654 c-177 -251 -324 -463 -327 -470 -4 -12 227 -544 237 -544 3 0 46 60 97 133 51 72 143 204 206 292 62 88 234 331 382 540 147 209 288 408 312 443 l45 62 -315 0 -315 0 -322 -456z"/>
          <path d="M1457 2058 c-19 -29 -155 -222 -300 -428 -146 -206 -312 -440 -368 -520 -56 -80 -178 -252 -271 -383 -93 -130 -171 -243 -174 -251 -3 -8 27 -85 66 -173 39 -87 85 -191 103 -230 l31 -73 1027 0 1027 0 170 293 170 292 -944 5 -944 5 107 150 c59 83 248 350 421 595 l314 445 420 5 421 5 84 145 c47 80 87 151 90 158 4 9 -141 12 -705 12 l-709 0 -36 -52z"/>
        </g>
      </svg>
      <div style={{ marginTop: '1em', fontSize: '1em', textTransform: uppercase ? 'uppercase' : 'none' }}>
        {supplement}
      </div>
    </div>
  )

  const selectedLogo = type === 'full' ? LogoFullSVG : LogoSygnetSVG;

  return (
    <div>
      {link ? (
        <Link to={link} style={{ textDecoration: 'none', color: color }}>
          {selectedLogo}
        </Link>
      ) : (
        selectedLogo
      )}
    </div>
  );
};

export default Logo;
 