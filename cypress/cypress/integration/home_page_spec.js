describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://oa.kaoyan-vip.cn/login/?backurl=http://dev.kaoyan-vip.cn:8080/admin/dashboard')
    cy.get('#login-user').type('13812872860')
    cy.get('.layui-form .layui-input-block [name="password"]').eq(0).type('123456Bos')
    cy.get('.user-btn.layui-btn').click()
  })
})