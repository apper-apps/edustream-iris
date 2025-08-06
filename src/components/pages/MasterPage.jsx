import VideoGrid from "@/components/organisms/VideoGrid";

const MasterPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <VideoGrid 
        section="master" 
        accessLevel="master"
        title="마스터 클래스"
      />
    </div>
  );
};

export default MasterPage;