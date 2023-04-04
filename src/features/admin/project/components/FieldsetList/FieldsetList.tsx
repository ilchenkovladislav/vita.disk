import { Setting } from '../Design/Design';
import { Fieldset } from '../Design/Design';

import { FieldsetItem } from '../FieldsetItem/FieldsetItem';

interface FieldsetList {}

export const FieldsetList: React.FC<FieldsetList> = () => {
  const pcLayoutSettings: Setting[] = [
    {
      img: 'https://wfolio.ru/assets/app/disk/cover_variant/fill-81169955dab93e20104f366d4838c869abbd7ac74e58195e2d6f5d59854fd38d.png',
      value: 'horizontal',
      label: 'горизонтальное'
    },
    {
      img: 'https://wfolio.ru/assets/app/disk/cover_variant/fit-bb01f426065c138fba06cf42ed1b0a603aa8c972c6e33e505eb9ef5dd7324239.png',
      value: 'vertical',
      label: 'вертикальное'
    },
    {
      img: 'https://wfolio.ru/assets/app/disk/cover_variant/none-b557ccde121b315f0047e70eb85c58e4be56fe644e47d6a7e7bb573b1590ab06.png',
      value: 'none',
      label: 'без фотографии'
    }
  ];

  const mobLayoutSettings: Setting[] = [
    {
      img: 'https://wfolio.ru/assets/app/disk/mobile_cover_variant/fit-ec4797943acfeb6a75421b815587a3e2374080592235ff0805d0e6536daf5c2a.png',
      value: 'horizontal',
      label: 'горизонтальное'
    },
    {
      img: 'https://wfolio.ru/assets/app/disk/mobile_cover_variant/fill-75906bf9a878a40ee40921746a190b361dde4acbff97dfe651fb917153af7eee.png',
      value: 'vertical',
      label: 'вертикальное'
    },
    {
      img: 'https://wfolio.ru/assets/app/disk/mobile_cover_variant/none-e197a09aebd077f8e39e0566a56db04228945e298ce4f7248189e67401252cf5.png',
      value: 'none',
      label: 'без фотографии'
    }
  ];

  const colorSchemeSettings: Setting[] = [
    {
      img: 'https://wfolio.ru/assets/app/disk/color_scheme/dark-181479ee2a184c5bd7e5e9e3c5386e4f5e2e8e60fe8fe17ab1dd04200d84cc35.png',
      value: 'light',
      label: 'светлая'
    },
    {
      img: 'https://wfolio.ru/assets/app/disk/color_scheme/light-6896ce49c5107b12b517e04be19992cfc26ddd784642013110b838692c269892.png',
      value: 'dark',
      label: 'темная'
    }
  ];

  const mobImageLayoutSettings: Setting[] = [
    {
      img: 'https://wfolio.ru/assets/app/disk/mobile_variant/storyboard-713a715a74b5312a62d26384ff9348d9a6b8bd8f9898299609e3ce16c6c57373.svg',
      value: 'grid',
      label: 'сеткой'
    },
    {
      img: 'https://wfolio.ru/assets/app/disk/mobile_variant/lineup-3d32f23d4d1ad7ebaf712e2274ef470974e88204a5aabffbfec508e32d729def.svg',
      value: 'full',
      label: 'на весь экран'
    }
  ];

  const gapSizeSettings: Setting[] = [
    {
      img: 'https://wfolio.ru/assets/app/disk/pad/small-27000582803350856e127094be6e7cd9ab6c8f005cfa74fde7998fad604e05fd.svg',
      value: 'sm',
      label: 'маленький'
    },
    {
      img: 'https://wfolio.ru/assets/app/disk/pad/medium-6a9b14b0babd77a5483cb7ac8e4c3714c5d5483917e6fd7dfcaae70b9f250493.svg',
      value: 'md',
      label: 'средний'
    },
    {
      img: 'https://wfolio.ru/assets/app/disk/pad/large-60df749e3207ee89fd05902b5479ddb1bf7eda1f2e29ce500558eb85c0fd41b4.svg',
      value: 'lg',
      label: 'большой'
    }
  ];

  const fieldsets: Fieldset[] = [
    {
      title: 'отображение на компьютере',
      name: 'pclayout',
      settings: pcLayoutSettings
    },
    {
      title: 'отображение на телефоне',
      name: 'moblayout',
      settings: mobLayoutSettings
    },
    {
      title: 'цветовая схема',
      name: 'colorScheme',
      settings: colorSchemeSettings
    },
    {
      title: 'раскладка фотографий на телефоне',
      name: 'mobImageLayout',
      settings: mobImageLayoutSettings
    },
    {
      title: 'отступы между фото',
      name: 'gapSize',
      settings: gapSizeSettings
    }
  ];

  return (
    <>
      {fieldsets.map((fieldset) => (
        <FieldsetItem
          fieldset={fieldset}
          settings={fieldset.settings}
          key={fieldset.title}
        />
      ))}
    </>
  );
};
