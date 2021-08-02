import { mount } from '@vue/test-utils'
import LinkItem from '@/components/LinkItem.vue'

describe('LinkItem.vue', () => {
  it('link list render', () => {
    const wrapper = mount(LinkItem, {
        propsData: {
          link: { name: "Google", url: "https://www.google.com/", points: 1 }
        }
    })
    expect(wrapper.text()).toContain('google.com')
  })
})

