//CHECKSUM:242635ebd9d06eb473e147348eaf9ae45050e6a1775084e1f5bce9eee3692a74
const ActionButton = require('./action_button')
const Carousel = require('./carousel')

module.exports = {
  id: 'builtin_card',
  group: 'Built-in Messages',
  title: 'card',

  jsonSchema: {
    description: 'module.builtin.types.card.description',
    type: 'object',
    required: ['title'],
    properties: {
      title: {
        type: 'string',
        title: 'title'
      },
      subtitle: {
        type: 'string',
        title: 'subtitle'
      },
      image: {
        type: 'string',
        $subtype: 'media',
        $filter: '.jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*',
        title: 'image'
      },
      actions: {
        type: 'array',
        title: 'module.builtin.actionButton',
        items: ActionButton.jsonSchema
      }
    }
  },

  uiSchema: {
    title: {
      'ui:widget': 'textarea'
    },
    subtitle: {
      'ui:widget': 'textarea'
    }
  },

  computePreviewText: formData => formData.title && `Card: ${formData.title}`,
  renderElement: (data, channel) => Carousel.renderElement({ items: [data], ...data }, channel)
}
