// @flow
import LibPhoneNumber from 'google-libphonenumber';

const PhoneNumberUtil = LibPhoneNumber.PhoneNumberUtil.getInstance();
const { PhoneNumberFormat, AsYouTypeFormatter } = LibPhoneNumber;

// eslint-disable-next-line
const EXTRA_CHAR_REGEXP = /\(|\)|\-|\s/g;

const shouldBeFormatted = (number: ?string) => {
  if (!number || number.length <= 5) {
    return false;
  }

  return !number.includes('#') && !number.includes('*');
};

const getDisplayableNumber = (number: string, country: string, asYouType: boolean = false): string => {
  if (!shouldBeFormatted(number)) {
    return number;
  }

  let displayValue = '';

  if (asYouType) {
    const formatter = new AsYouTypeFormatter(country);
    number.split('').forEach(char => {
      displayValue = formatter.inputDigit(char);
    });
  } else {
    const parsedNumber = PhoneNumberUtil.parseAndKeepRawInput(number, country);

    displayValue = PhoneNumberUtil.format(parsedNumber, PhoneNumberFormat.NATIONAL);
  }

  return displayValue;
};

const getCallableNumber = (number: string, country: string): string =>
  getDisplayableNumber(number, country).replace(EXTRA_CHAR_REGEXP, '');

export { PhoneNumberUtil, PhoneNumberFormat, AsYouTypeFormatter, getDisplayableNumber, getCallableNumber };
