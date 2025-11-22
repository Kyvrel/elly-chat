'use client'

import { useState } from 'react'

/**
 * Simple Chatbot - 从零开始学习版本
 *
 * 学习路径：
 * Step 1: 创建基础页面容器
 * Step 2: 添加顶部标题
 * Step 3: 添加第一条 AI 消息
 * Step 4: 添加用户消息
 * Step 5: 用变量控制消息角色
 * Step 6: 添加条件样式
 * Step 7: 使用 map 渲染多条消息
 */

export default function ChatPage() {
  const messages = [
    { id: 1, role: 'assistant', content: 'Hi there, what can I do for you' },
    { id: 2, role: 'user', content: 'Hello, whats the weather tody' },
    {
      id: 3,
      role: 'assistant',
      content: 'Very well, the temperature is 16C tody',
    },
    { id: 4, role: 'user', content: 'I want to do some exercise' },
    {
      id: 5,
      role: 'assistant',
      content: 'Thats great, exercise help us keep fit',
    },
  ]
  /* TODO(human): 使用 map 渲染多条消息

     需求：
     1. 创建消息数组：
        - 定义一个 messages 数组，包含 3-4 条消息
        - 每条消息是一个对象：{ id: string, role: 'user' | 'assistant', content: string }
        - 例如：
          const messages = [
            { id: '1', role: 'assistant', content: 'Hi! How can I help?' },
            { id: '2', role: 'user', content: 'Hello!' },
            ...
          ]

     2. 使用 map 遍历：
        - 使用 messages.map((message) => { ... })
        - 在每个消息中：
          · 根据 message.role 判断 isUser
          · 渲染之前写好的消息结构
          · 使用 message.content 作为内容
          · 重要：添加 key={message.id} 到最外层 div

     3. 为什么需要 key：
        - React 使用 key 来追踪列表中的每个元素
        - 没有 key 会有警告，而且可能导致渲染问题
        - key 必须是唯一的（通常用 id）
  */

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-3 ">
        <h1 className="text-lg font-semibold">Simple Chat</h1>
      </header>

      <div className="w-full max-w-3xl mx-auto mt-10">
        {messages.map(msg => {
          const isUser = msg.role === 'user'
          return (
            <div
              key={msg.id}
              className={`flex p-4 gap-2 ${
                isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              {!isUser && (
                <div className="size-8 flex justify-center items-center rounded-full font-semibold bg-purple-600 text-white text-sm">
                  AI
                </div>
              )}
              <div
                className={`rounded-lg px-4 py-2 text-sm  ${
                  isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900 flex-1'
                }`}
              >
                {msg.content}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
