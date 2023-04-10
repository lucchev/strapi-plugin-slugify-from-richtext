import { Box, Tooltip, TextInput } from "@strapi/design-system"
import { useCMEditViewDataManager } from "@strapi/helper-plugin"
import React, { useEffect, memo } from "react"
import { Earth } from "@strapi/icons"

import { slugify } from "../../utils/slug-from-richtext"

interface IString {
  defaultMessage: string
}

type Props = {
  name?: string
  value?: string
  placeholder?: IString
  required?: boolean
  description?: IString
  labelAction?: {props: {title: {defaultMessage: string}}}
  intlLabel?: IString
  attribute: {relatedTo?: string, wordJoiner?: string, wordMaxNb?: number}
  onChange: (res:{target:{name?:string,value:string}}) => {}
}

const SlugFromRichText = (props:Props) => {

  let {
    name,
    value,
    placeholder,
    required,
    description,
    labelAction,
    intlLabel,
    onChange,
    attribute
  } = props;

  const relatedFieldName = attribute.relatedTo || 'richTextContent';
  const wordJoiner = attribute.wordJoiner || '-';
  const wordMaxNb = attribute.wordMaxNb || 4;

  const cmEditView = useCMEditViewDataManager();
  const { modifiedData } = cmEditView;

  useEffect(() => {handleGenerateAction()}, [modifiedData]);

  const callback = (slug:string) => {
    onChange({
      target: {
        name,
        value: slug,
      }
    });
  }

  const handleGenerateAction = async () => {
    const currentRelatedFieldValue = modifiedData[relatedFieldName];
    const slug = slugify(currentRelatedFieldValue, wordJoiner, wordMaxNb);
    
    callback(slug);
    return slug;
  }

   if (!relatedFieldName) return null;

  return (
    <Box style={{ position: "relative" }}>
      <TextInput
        id={name}
        name={name}
        hint={description?.defaultMessage}
        label={intlLabel?.defaultMessage || name}
        placeholder={placeholder?.defaultMessage}
        onChange={onChange}
        value={value}
        labelAction={
          labelAction && (
            <Tooltip description={labelAction.props.title.defaultMessage}>
              <Earth aria-hidden={true} />
            </Tooltip>
          )
        }
        required={required}
      />
    </Box>
  )
}

export default memo(SlugFromRichText)
