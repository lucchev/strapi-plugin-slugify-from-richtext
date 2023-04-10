import { Box, TextInput, Tooltip } from "@strapi/design-system"
import { useCMEditViewDataManager } from "@strapi/helper-plugin"
import { Earth } from "@strapi/icons"
import React, { memo, useEffect } from "react"
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
  attribute: {
    relatedTo?: string, 
    wordJoiner?: string, 
    wordMaxNb?: number, 
    hidden?: boolean
    removeAccents?: boolean
    removeSpecialCharacters?: boolean
    removeUpperCase?: boolean
    addEllipsis?: boolean
  }
  onChange: (res:{target:{name?:string,value:string}}) => {}
  disabled?: boolean
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
    attribute,
    disabled,
  } = props;

  const relatedFieldName = attribute.relatedTo || 'richTextContent';
  const wordJoiner = attribute.wordJoiner || '-';
  const wordMaxNb = attribute.wordMaxNb || 4;
  const hidden = attribute.hidden ?? false;
  const removeAccents = attribute.removeAccents ?? true;
  const removeSpecialCharacters = attribute.removeSpecialCharacters ?? true;
  const removeUpperCase = attribute.removeUpperCase ?? true;
  const addEllipsis = attribute.addEllipsis ?? false;

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

    const isArray = !!modifiedData.content;
    if (isArray){
      const id = name?.split('.').find((item:string) => !Number.isNaN(Number(item)));
      
      if (id){
          const item = (modifiedData.content as Array<any>)[Number(id)];
          const currentRelatedFieldValue = item[relatedFieldName];
          const slug = slugify(currentRelatedFieldValue, wordJoiner, wordMaxNb, removeUpperCase, removeAccents, removeSpecialCharacters, addEllipsis);
          
          callback(slug);
      }
    }else{
      const currentRelatedFieldValue = modifiedData[relatedFieldName];
      const slug = slugify(currentRelatedFieldValue, wordJoiner, wordMaxNb, removeUpperCase, removeAccents, removeSpecialCharacters, addEllipsis);
      callback(slug);
    }
  }

   if (!relatedFieldName) return null;

  return (
    <Box style={{ position: "relative", display: hidden ? "none" : "block"  }}>
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
        disabled={disabled}
      />
    </Box>
  )
}

export default memo(SlugFromRichText)
