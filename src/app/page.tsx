// 添加 "use client" 指令
"use client";


import React, { useEffect, useState } from 'react';
import Swiper from "@/components/Swiper";
import Typed from "@/components/Typed";
import Starry from "@/components/Starry";
import Container from "@/components/Container";
import ArticleLayout from "@/components/ArticleLayout";
import Sidebar from "@/components/Sidebar";

import { getThemeDataAPI } from '@/api/project';

interface Props {
  searchParams: { page: number };
};

const PageComponent: React.FC<Props> = ({ searchParams }) => {
  const [data, setData] = useState<any>(null);
  const page = searchParams.page || 1;

  useEffect(() => {
    const fetchData = async () => {
      const { data: themeData } = await getThemeDataAPI();
      setData(themeData);
    };

    fetchData();
  }, [searchParams]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'F12') {
        const alertModal = document.createElement('div'); 
        alertModal.className = 'alert-modal highlighted'; // 直接添加 .highlighted 类
        alertModal.textContent = '开发者模式已打开，请遵守GPL协议';
        alertModal.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: #4169E1;
          color: white;
          padding: 10px;
          text-align: center;
          z-index: 9999;  
        `;
        document.body.appendChild(alertModal);
        
        // 设置定时器来自动关闭弹窗
        setTimeout(() => {
          document.body.removeChild(alertModal);
        }, 3000); // 3秒后自动关闭
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);

    // 清理事件监听器
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!data) {
    return <div>加载中...</div>;
  }

  return (
    <>
      <Swiper src={data?.swiperImage}>
        {/* 星空背景组件 */}
        <Starry />
        {/* 打字机组件 */}
        <Typed className="absolute top-[45%] sm:top-[40%] left-[50%] transform -translate-x-1/2 w-[80%] text-center text-white xs:text-xl sm:text-[30px] leading-7 sm:leading-[40px] md:leading-[50px] custom_text_shadow"></Typed>
      </Swiper>

      <Container>
        {/* 文章列表 */}
        <ArticleLayout page={page} />
        {/* 侧边栏 */}
        <Sidebar />
      </Container>
    </>
  );
};

export default PageComponent;
