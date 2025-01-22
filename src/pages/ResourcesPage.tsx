import { useState } from 'react';
import { Search, FileText, Video, BookOpen, Download, ExternalLink, ChevronRight, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/ui/button';

interface Resource {
  id: string;
  title: string;
  type: 'document' | 'video' | 'article';
  format?: string;
  description: string;
  learningPathId: string;
  learningPathTitle: string;
  moduleId: number;
  moduleTitle: string;
  uploadDate: string;
  fileSize?: string;
  duration?: string;
  downloadUrl?: string;
  readUrl?: string;
  tags: string[];
}

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'React Component Design Patterns',
    type: 'document',
    format: 'PDF',
    description: 'A comprehensive guide to React component patterns and best practices',
    learningPathId: 'path-1',
    learningPathTitle: 'Frontend Development Masterclass',
    moduleId: 1,
    moduleTitle: 'React Fundamentals',
    uploadDate: '2025-01-15',
    fileSize: '2.4 MB',
    downloadUrl: '/documents/react-patterns.pdf',
    readUrl: '/viewer/react-patterns',
    tags: ['React', 'Components', 'Architecture']
  },
  {
    id: '2',
    title: 'State Management Deep Dive',
    type: 'video',
    description: 'In-depth tutorial on Redux and Context API',
    learningPathId: 'path-1',
    learningPathTitle: 'Frontend Development Masterclass',
    moduleId: 2,
    moduleTitle: 'State Management',
    uploadDate: '2025-01-10',
    duration: '45:00',
    readUrl: '/video/state-management',
    tags: ['Redux', 'Context API', 'State Management']
  },
  {
    id: '3',
    title: 'RESTful API Design Guide',
    type: 'document',
    format: 'PDF',
    description: 'Best practices for designing RESTful APIs',
    learningPathId: 'path-2',
    learningPathTitle: 'Backend Development Essentials',
    moduleId: 3,
    moduleTitle: 'API Design',
    uploadDate: '2025-01-12',
    fileSize: '1.8 MB',
    downloadUrl: '/documents/api-design.pdf',
    readUrl: '/viewer/api-design',
    tags: ['API', 'REST', 'Backend']
  },
  {
    id: '4',
    title: 'Introduction to GraphQL',
    type: 'article',
    description: 'Understanding GraphQL basics and implementation',
    learningPathId: 'path-2',
    learningPathTitle: 'Backend Development Essentials',
    moduleId: 3,
    moduleTitle: 'API Design',
    uploadDate: '2025-01-08',
    readUrl: '/articles/graphql-intro',
    tags: ['GraphQL', 'API', 'Backend']
  }
];

export function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'documents' | 'videos' | 'articles'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPath, setSelectedPath] = useState<string>('all');
  const [selectedModule, setSelectedModule] = useState<string>('all');

  // Get unique learning paths
  const learningPaths = Array.from(new Set(mockResources.map(r => ({
    id: r.learningPathId,
    title: r.learningPathTitle
  })))).reduce((acc, curr) => {
    if (!acc.find(p => p.id === curr.id)) {
      acc.push(curr);
    }
    return acc;
  }, [] as { id: string; title: string; }[]);

  // Get unique modules for selected path
  const modules = Array.from(new Set(mockResources
    .filter(r => selectedPath === 'all' || r.learningPathId === selectedPath)
    .map(r => ({
      id: r.moduleId,
      title: r.moduleTitle
    }))
  )).reduce((acc, curr) => {
    if (!acc.find(m => m.id === curr.id)) {
      acc.push(curr);
    }
    return acc;
  }, [] as { id: number; title: string; }[]);

  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesPath = selectedPath === 'all' || resource.learningPathId === selectedPath;
    const matchesModule = selectedModule === 'all' || resource.moduleId === Number(selectedModule);
    const matchesType = activeTab === 'all' || resource.type === activeTab.slice(0, -1);

    return matchesSearch && matchesPath && matchesModule && matchesType;
  });

  const renderResourceCard = (resource: Resource) => (
    <Card key={resource.id} className="w-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            {/* Path and Module Info */}
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <BookOpen className="h-4 w-4" />
              <span>{resource.learningPathTitle}</span>
              <ChevronRight className="h-4 w-4" />
              <span>{resource.moduleTitle}</span>
            </div>

            {/* Title and Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{resource.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {resource.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Resource Details */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                {resource.type === 'video' ? (
                  <Video className="h-4 w-4" />
                ) : resource.type === 'document' ? (
                  <FileText className="h-4 w-4" />
                ) : (
                  <BookOpen className="h-4 w-4" />
                )}
                <span className="capitalize">{resource.type}</span>
              </div>
              {resource.duration && <span>{resource.duration}</span>}
              {resource.fileSize && <span>{resource.fileSize}</span>}
              <span>{new Date(resource.uploadDate).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm" className="w-24">
              <ExternalLink className="h-4 w-4 mr-2" />
              View
            </Button>
            {resource.downloadUrl && (
              <Button variant="outline" size="sm" className="w-24">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Learning Resources</h1>
        <p className="mt-1 text-sm text-gray-500">
          Access study materials, guides, and videos from your learning paths
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={selectedPath} onValueChange={setSelectedPath}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by learning path" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Learning Paths</SelectItem>
            {learningPaths.map(path => (
              <SelectItem key={path.id} value={path.id}>{path.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedModule} onValueChange={setSelectedModule}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by module" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modules</SelectItem>
            {modules.map(module => (
              <SelectItem key={module.id} value={module.id.toString()}>{module.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          <Filter className="h-4 w-4" />
          More Filters
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)}>
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {filteredResources.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  No resources found matching your criteria.
                </CardContent>
              </Card>
            ) : (
              filteredResources.map(renderResourceCard)
            )}
          </div>
        </TabsContent>

        {['documents', 'videos', 'articles'].map(tab => (
          <TabsContent key={tab} value={tab} className="mt-6">
            <div className="space-y-4">
              {filteredResources
                .filter(r => r.type === tab.slice(0, -1))
                .map(renderResourceCard)}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default ResourcesPage;