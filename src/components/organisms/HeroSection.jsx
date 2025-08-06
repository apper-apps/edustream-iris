import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import React from "react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
<div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2523ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            새로운 배움의
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              여정을 시작하세요
            </span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            전문가가 제작한 고품질 동영상 강의로 여러분의 꿈을 현실로 만들어보세요.
            멤버십, 마스터 클래스, 그리고 깊이 있는 인사이트까지.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              size="xl" 
              variant="secondary"
              onClick={() => navigate("/membership")}
              className="bg-white text-primary-600 hover:bg-gray-50 shadow-xl"
            >
              <ApperIcon name="Play" size={20} className="mr-2" />
              무료로 시작하기
            </Button>
            <Button 
              size="xl" 
              variant="outline"
              onClick={() => navigate("/master")}
              className="border-white text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <ApperIcon name="Crown" size={20} className="mr-2" />
              마스터 클래스 보기
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="BookOpen" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">멤버십 강의</h3>
              <p className="text-blue-100">체계적인 커리큘럼으로 기초부터 심화까지</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Crown" size={32} className="text-yellow-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">마스터 클래스</h3>
              <p className="text-blue-100">업계 전문가의 고급 실무 노하우</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Lightbulb" size={32} className="text-orange-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">인사이트</h3>
              <p className="text-blue-100">최신 트렌드와 학습 방법론</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;