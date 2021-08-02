import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

describe('Header.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Link VOTE  Challenge'
    const wrapper = shallowMount(Header, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})

describe('Header.vue', () => {
  it('hb logo render', () => {
    const wrapper = shallowMount(Header)
    expect(wrapper.contains('img')).toBe(true)
  })
})