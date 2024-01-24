export interface SearchHotelsByParamsSuccessResp {
  status: boolean;
  message: string;
  timestamp: number;
  data: SearchHotelByParamsData;
}
export interface SearchHotelByParamsData {
  hotels?: HotelsEntity[] | null;
  meta?: MetaEntity[] | null;
  appear?: AppearEntity[] | null;
}
export interface HotelsEntity {
  hotel_id: number;
  accessibilityLabel: string;
  property: Property;
}
export interface Property {
  propertyClass: number;
  position: number;
  currency: string;
  reviewScoreWord: string;
  countryCode: string;
  photoUrls?: string[] | null;
  wishlistName: string;
  optOutFromGalleryChanges: number;
  isFirstPage: boolean;
  reviewCount: number;
  reviewScore: number;
  name: string;
  rankingPosition: number;
  ufi: number;
  id: number;
  checkout: CheckoutOrCheckin;
  mainPhotoId: number;
  longitude: number;
  checkin: CheckoutOrCheckin;
  accuratePropertyClass: number;
  qualityClass: number;
  priceBreakdown: PriceBreakdown;
  checkoutDate: string;
  checkinDate: string;
  blockIds?: string[] | null;
  latitude: number;
  isPreferred?: boolean | null;
  isPreferredPlus?: boolean | null;
}
export interface CheckoutOrCheckin {
  fromTime: string;
  untilTime: string;
}
export interface PriceBreakdown {
  taxExceptions?: null[] | null;
  grossPrice: GrossPriceOrStrikethroughPrice;
  benefitBadges?: (BenefitBadgesEntity | null)[] | null;
  strikethroughPrice?: GrossPriceOrStrikethroughPrice1 | null;
}
export interface GrossPriceOrStrikethroughPrice {
  currency: string;
  value: number;
}
export interface BenefitBadgesEntity {
  identifier: string;
  text: string;
  explanation: string;
  variant: string;
}
export interface GrossPriceOrStrikethroughPrice1 {
  currency: string;
  value: number;
}
export interface MetaEntity {
  title: string;
}
export interface AppearEntity {
  id?: string | null;
  component?: Component | null;
  contentUrl?: string | null;
}
export interface Component {
  props: Props;
}
export interface Props {
  fill?: boolean | null;
  content?: Content | null;
  text?: string | null;
  title?: string | null;
}
export interface Content {
  props: Props1;
}
export interface Props1 {
  items?: ItemsEntity[] | null;
  fitContentWidth: boolean;
}
export interface ItemsEntity {
  props: Props2;
}
export interface Props2 {
  component?: Component1 | null;
}
export interface Component1 {
  props: Props3;
}
export interface Props3 {
  items?: ItemsEntity1[] | null;
  spacing?: string | null;
  icon?: string | null;
  tertiaryTintedColor?: string | null;
  variant?: string | null;
  accessibilityLabel?: string | null;
}
export interface ItemsEntity1 {
  props: Props4;
}
export interface Props4 {
  text?: TextEntity[] | null;
}
export interface TextEntity {
  font: string;
  text: string;
  color?: string | null;
  linkActions?: LinkActionsEntity[] | null;
}
export interface LinkActionsEntity {
  props: Props5;
}
export interface Props5 {
  url: string;
}
